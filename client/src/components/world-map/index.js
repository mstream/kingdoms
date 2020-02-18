/**
 * @flow
 */

import React, {useEffect} from 'react';
import type {Dispatch} from 'redux';
import {connect} from 'react-redux';
import {TileComponent} from '../tile';
import {CityComponent} from '../city';
import type {ClientAction} from '../../state/actions';
import {
    moveCameraDown,
    moveCameraLeft,
    moveCameraRight,
    moveCameraUp,
    zoomCameraIn,
    zoomCameraOut,
} from '../../state/actions';
import {
    addVectors,
    multipleVectors,
    subtractVectors,
} from '../../../../common/src/vector';
import {checkIfIntersect} from '../../../../common/src/geometry';
import type {ClientStateCamera} from '../../state/reducers/camera';
import type {ClientStateTile} from '../../state/reducers/tiles';
import type {ClientState} from '../../state/reducers/root';
import type {ClientStateCity} from '../../state/reducers/cities';
import {EMPTY_OBJECT} from '../../../../common/src/util';
import type {Vector} from '../../../../common/src/vector';
import type {Geometry} from '../../../../common/src/geometry';

type OwnProps = {
    camera: ClientStateCamera,
    cities: $ReadOnlyArray<ClientStateCity>,
    tiles: $ReadOnlyArray<ClientStateTile>,
    windowSize: Vector,
};

type StateProps = {};

type DispatchProps = {
    moveCameraUp: () => mixed,
    moveCameraDown: () => mixed,
    moveCameraLeft: () => mixed,
    moveCameraRight: () => mixed,
    zoomCameraIn: () => mixed,
    zoomCameraOut: () => mixed,
};

type Props = {
    ...OwnProps,
    ...StateProps,
    ...DispatchProps,
};

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
                size: windowGeometry.size,
            },
        };
    });
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

    if (camera == null || tiles.length === 0) {
        return <div>loading world map...</div>;
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

    const visibleTiles = cullObjects({
        cameraGeometry: camera.geometry,
        objects: tiles,
    });

    const visibleCities = cullObjects({
        cameraGeometry: camera.geometry,
        objects: cities,
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
        objects: visibleTiles,
        desiredCameraSizeToWorldCameraSizeRatioVector,
        cameraWindowGeometry,
        cameraLocationToWindowCenterLocationVector,
    });

    const transformedVisibleCities = transformObjectGeometries({
        objects: visibleCities,
        desiredCameraSizeToWorldCameraSizeRatioVector,
        cameraWindowGeometry,
        cameraLocationToWindowCenterLocationVector,
    });

    const tileComponents = transformedVisibleTiles.map(tile => {
        return (
            <TileComponent
                key={`${tile.index.x}-${tile.index.y}`}
                tile={tile}
            />
        );
    });

    const cityComponents = transformedVisibleCities.map(city => {
        return <CityComponent key={city.id} city={city}/>;
    });

    return (
        <div className="">
            {tileComponents}
            {cityComponents}
        </div>
    );
};

const mapStateToProps = (state: ClientState): StateProps => {
    return EMPTY_OBJECT;
};

const mapDispatchToProps = (
    dispatch: Dispatch<ClientAction>
): DispatchProps => {
    return {
        moveCameraUp: () => dispatch(moveCameraUp()),
        moveCameraDown: () => dispatch(moveCameraDown()),
        moveCameraLeft: () => dispatch(moveCameraLeft()),
        moveCameraRight: () => dispatch(moveCameraRight()),
        zoomCameraIn: () => dispatch(zoomCameraIn()),
        zoomCameraOut: () => dispatch(zoomCameraOut()),
    };
};

export const WorldMapComponent = connect<Props,
    OwnProps,
    StateProps,
    DispatchProps,
    ClientState,
    Dispatch<ClientAction>>(
    mapStateToProps,
    mapDispatchToProps
)(Component);