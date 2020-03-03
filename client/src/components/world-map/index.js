// @flow

import React, {useEffect} from 'react';
import type {Dispatch} from 'redux';
import {connect} from 'react-redux';
import {TerrainTileComponent} from '../tile';
import {CityTileComponent} from '../city-tile';
import type {
    ClientAction,
    ClientMoveCameraActionCreator,
    ClientZoomCameraActionCreator
} from '../../state/actions';
import {
    moveCameraDown,
    moveCameraLeft,
    moveCameraRight,
    moveCameraUp,
    zoomCameraIn,
    zoomCameraOut
} from '../../state/actions';
import type {Vector} from '../../../../common/src/vector';
import {
    addVectors,
    multipleVectors,
    subtractVectors,
} from '../../../../common/src/vector';
import type {Geometry} from '../../../../common/src/geometry';
import {checkIfIntersect} from '../../../../common/src/geometry';
import {LoaderComponent} from '../loader';
import type {
    ClientState,
    ClientStateCamera,
    ClientStateTile,
    ClientStateTiles
} from '../../state/state';
import type {CommonStateCities} from '../../../../common/src/state';


const cullObjects = <T: { geometry: Geometry, ... }>({
                                                         objects,
                                                         cameraGeometry,
                                                     }: {
    objects: $ReadOnlyArray<T>,
    cameraGeometry: Geometry,
}): $ReadOnlyArray<T> => {
    return objects.filter(object => {
        return checkIfIntersect({
            geometry1: object.geometry,
            geometry2: cameraGeometry,
        });
    });
};

const transformObjectGeometries = <T: { geometry: Geometry, ... }>({
                                                                       objects,
                                                                       cameraWindowGeometry,
                                                                       cameraLocationToWindowCenterLocationVector,
                                                                       desiredCameraSizeToWorldCameraSizeRatioVector,
                                                                   }: {
    objects: $ReadOnlyArray<T>,
    cameraWindowGeometry: Geometry,
    cameraLocationToWindowCenterLocationVector: Vector,
    desiredCameraSizeToWorldCameraSizeRatioVector: Vector,
}): $ReadOnlyArray<T> => {
    return objects.map(object => {
        const windowGeometry = {
            location: addVectors({
                vector1: object.geometry.location,
                vector2: cameraLocationToWindowCenterLocationVector,
            }),
            size: multipleVectors({
                vector1: object.geometry.size,
                vector2: desiredCameraSizeToWorldCameraSizeRatioVector,
            }),
        };

        const distanceFromWindowCameraCenter = subtractVectors({
            vector1: windowGeometry.location,
            vector2: cameraWindowGeometry.location,
        });

        const zoomedLocation = {
            x:
                cameraWindowGeometry.location.x +
                distanceFromWindowCameraCenter.x *
                desiredCameraSizeToWorldCameraSizeRatioVector.x,
            y:
                cameraWindowGeometry.location.y +
                distanceFromWindowCameraCenter.y *
                desiredCameraSizeToWorldCameraSizeRatioVector.y,
        };
        return {
            ...object,
            geometry: {
                location: zoomedLocation,
                size: {
                    x: Math.ceil(windowGeometry.size.x),
                    y: Math.ceil(windowGeometry.size.y),
                },
            },
        };
    });
};

type OwnProps = {
    camera: ClientStateCamera,
    cities: CommonStateCities,
    tiles: ClientStateTiles,
    windowSize: Vector,
};

type StateProps = {};

type DispatchProps = {
    moveCameraUp: ClientMoveCameraActionCreator,
    moveCameraDown: ClientMoveCameraActionCreator,
    moveCameraLeft: ClientMoveCameraActionCreator,
    moveCameraRight: ClientMoveCameraActionCreator,
    zoomCameraIn: ClientZoomCameraActionCreator,
    zoomCameraOut: ClientZoomCameraActionCreator,
};

type Props = {
    ...OwnProps,
    ...StateProps,
    ...DispatchProps,
};

const Component = ({
                       camera,
                       cities,
                       tiles,
                       moveCameraUp,
                       moveCameraDown,
                       moveCameraLeft,
                       moveCameraRight,
                       windowSize,
                       zoomCameraIn,
                       zoomCameraOut,
                   }: Props) => {
    useEffect(() => {
        window.addEventListener('keydown', event => {
            switch (event.key) {
                case 'ArrowUp': {
                    moveCameraUp();
                    break;
                }
                case 'ArrowDown': {
                    moveCameraDown();
                    break;
                }
                case 'ArrowLeft': {
                    moveCameraLeft();
                    break;
                }
                case 'ArrowRight': {
                    moveCameraRight();
                    break;
                }
                case '[': {
                    zoomCameraOut();
                    break;
                }
                case ']': {
                    zoomCameraIn();
                    break;
                }
                default: {
                }
            }
        });
    }, [
        moveCameraUp,
        moveCameraDown,
        moveCameraLeft,
        moveCameraRight,
        zoomCameraIn,
        zoomCameraOut,
    ]);

    if (tiles.terrain.length === 0) {
        return (
            <LoaderComponent/>
        );
    }

    const windowCenterLocation = multipleVectors({
        vector1: windowSize,
        vector2: {x: 0.5, y: 0.5},
    });

    const cameraLocationToWindowCenterLocationVector = subtractVectors({
        vector1: windowCenterLocation,
        vector2: camera.geometry.location,
    });

    const desiredDimensionRatio = Math.max(
        windowSize.x / camera.geometry.size.x,
        windowSize.y / camera.geometry.size.y
    );

    const desiredCameraSizeToWorldCameraSizeRatioVector = {
        x: desiredDimensionRatio,
        y: desiredDimensionRatio,
    };

    const visibleTerrainTiles = cullObjects({
        cameraGeometry: camera.geometry,
        objects: tiles.terrain,
    });

    const visibleCityIds: $ReadOnlyArray<string> = Object.keys(cities).reduce(
        (visibleCityIds, cityId) => {
            const tile = tiles.city[cityId];

            const isVisible = checkIfIntersect({
                geometry1: tile.geometry,
                geometry2: camera.geometry,
            });

            return [...visibleCityIds, ...(isVisible ? [cityId] : [])];
        },
        [],
    );

    const visibleCityTiles: $ReadOnlyArray<ClientStateTile> = visibleCityIds.map((cityId) => {
        return tiles.city[cityId];
    });

    const cameraWindowGeometry = {
        location: addVectors({
            vector1: camera.geometry.location,
            vector2: cameraLocationToWindowCenterLocationVector,
        }),
        size: multipleVectors({
            vector1: camera.geometry.size,
            vector2: desiredCameraSizeToWorldCameraSizeRatioVector,
        }),
    };

    const transformedVisibleTiles = transformObjectGeometries({
        objects: visibleTerrainTiles,
        desiredCameraSizeToWorldCameraSizeRatioVector,
        cameraWindowGeometry,
        cameraLocationToWindowCenterLocationVector,
    });

    const transformedVisibleCityTiles = transformObjectGeometries({
        objects: visibleCityTiles,
        desiredCameraSizeToWorldCameraSizeRatioVector,
        cameraWindowGeometry,
        cameraLocationToWindowCenterLocationVector,
    });

    const terrainTileComponents = transformedVisibleTiles.map(tile => {
        return (
            <TerrainTileComponent
                key={`${tile.index.x}-${tile.index.y}`}
                tile={tile}
            />
        );
    });

    const cityTileComponents = visibleCityIds.map((cityId, index) => {
        return <CityTileComponent
            key={cityId}
            city={cities[cityId]}
            cityId={cityId}
            cityTile={transformedVisibleCityTiles[index]}
        />;
    });

    return (
        <div>
            {terrainTileComponents}
            {cityTileComponents}
        </div>
    );
};

const mapStateToProps = (state: ClientState): StateProps => {
    return Object.freeze({});
};

const actionCreators: DispatchProps = {
    moveCameraUp,
    moveCameraDown,
    moveCameraLeft,
    moveCameraRight,
    zoomCameraIn,
    zoomCameraOut,
};

export const WorldMapComponent = connect<Props,
    OwnProps,
    StateProps,
    DispatchProps,
    ClientState,
    Dispatch<ClientAction>>(
    mapStateToProps,
    // $FlowFixMe
    actionCreators
)(Component);
