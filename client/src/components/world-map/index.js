/**
 * @flow
 */

import React, {useEffect} from 'react';
import type {Dispatch} from 'redux';
import {connect} from 'react-redux';
import './style.css';
import type {Action} from '../../types';
import {TileComponent} from '../tile';
import {CityComponent} from '../city';
import {
    moveCameraDown,
    moveCameraLeft,
    moveCameraRight,
    moveCameraUp,
    zoomCameraIn,
    zoomCameraOut
} from '../../actions';
import {
    addVectors,
    multipleVectors,
    subtractVectors,
} from '../../../../common/src/vector';
import type {Geometry, Vector} from '../../../../common/src/types';
import {checkIfIntersect} from '../../../../common/src/geometry';
import type {
    ClientState,
    ClientStateCamera,
    ClientStateCity,
    ClientStateTile
} from '../../state/types';

type OwnProps = {};
type StateProps = { camera: ClientStateCamera, cities: $ReadOnlyArray<ClientStateCity>, tiles: $ReadOnlyArray<ClientStateTile> };
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
    ...DispatchProps
}

const cullObjects = <T: { geometry: Geometry, ... }>({objects, camera}: { objects: $ReadOnlyArray<T>, camera: ClientStateCamera }): $ReadOnlyArray<T> => {
    return objects.filter(object => {
        return checkIfIntersect({
            geometry1: object.geometry,
            geometry2: camera.geometry,
        });
    });
};

const transformObjectGeometries = <T: { geometry: Geometry, ... }>({objects, cameraWindowGeometry, cameraLocationToWindowCenterLocationVector, desiredCameraSizeToWorldCameraSizeRatioVector}: { objects: $ReadOnlyArray<T>, cameraWindowGeometry: Geometry, cameraLocationToWindowCenterLocationVector: Vector, desiredCameraSizeToWorldCameraSizeRatioVector: Vector }): $ReadOnlyArray<T> => {
    return objects.map(object => {
        const windowGeometry = {
            location: addVectors({
                vector1: object.geometry.location,
                vector2: cameraLocationToWindowCenterLocationVector
            }),
            size: multipleVectors({
                vector1: object.geometry.size,
                vector2: desiredCameraSizeToWorldCameraSizeRatioVector
            }),
        };

        const distanceFromWindowCameraCenter = subtractVectors({
            vector1: windowGeometry.location,
            vector2: cameraWindowGeometry.location
        });

        const zoomedLocation = {
            x: cameraWindowGeometry.location.x + distanceFromWindowCameraCenter.x * desiredCameraSizeToWorldCameraSizeRatioVector.x,
            y: cameraWindowGeometry.location.y + distanceFromWindowCameraCenter.y * desiredCameraSizeToWorldCameraSizeRatioVector.y,
        };
        return {
            ...object,
            geometry: {
                location: zoomedLocation,
                size: windowGeometry.size,
            }
        };
    });
};

const Component = ({camera, cities, tiles, moveCameraUp, moveCameraDown, moveCameraLeft, moveCameraRight, zoomCameraIn, zoomCameraOut}: Props) => {
    useEffect(
        () => {
            window.addEventListener('keydown', (event) => {
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
        },
        [
            moveCameraUp,
            moveCameraDown,
            moveCameraLeft,
            moveCameraRight,
            zoomCameraIn,
            zoomCameraOut
        ]
    );

    if (tiles.length === 0) {
        return <div>loading world map...</div>;
    }

    const windowSize = {
        x: window.innerWidth,
        y: window.innerHeight
    };

    const windowCenterLocation = multipleVectors({
        vector1: windowSize,
        vector2: {x: 0.5, y: 0.5}
    });

    const cameraLocationToWindowCenterLocationVector = subtractVectors({
        vector1: windowCenterLocation,
        vector2: camera.geometry.location
    });

    const desiredCameraSizeToWorldCameraSizeRatioVector = {
        x: window.innerWidth / camera.geometry.size.x * 0.5,
        y: window.innerHeight / camera.geometry.size.y * 0.5,
    };

    const visibleTiles = cullObjects({
        camera: camera,
        objects: tiles,
    });

    const visibleCities = cullObjects({
        camera: camera,
        objects: cities,
    });

    const cameraWindowGeometry = {
        location: addVectors({
            vector1: camera.geometry.location,
            vector2: cameraLocationToWindowCenterLocationVector
        }),
        size: multipleVectors({
            vector1: camera.geometry.size,
            vector2: desiredCameraSizeToWorldCameraSizeRatioVector
        }),
    };

    const transformedVisibleTiles = transformObjectGeometries({
        objects: visibleTiles,
        desiredCameraSizeToWorldCameraSizeRatioVector,
        cameraWindowGeometry,
        cameraLocationToWindowCenterLocationVector
    });

    const transformedVisibleCities = transformObjectGeometries({
        objects: visibleCities,
        desiredCameraSizeToWorldCameraSizeRatioVector,
        cameraWindowGeometry,
        cameraLocationToWindowCenterLocationVector
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
        return (
            <CityComponent
                key={city.id}
                city={city}
            />
        );
    });

    // const style = {
    //     ...createGeometryStyle({
    //         geometry: cameraWindowGeometry
    //     }),
    //     borderStyle: 'solid',
    //     borderColor: 'rgba(255,0,0,1.0)',
    //     position: 'absolute',
    //     zIndex: -1
    // };
    //
    // const cameraComponent = (
    //     <div style={style}>
    //     </div>
    // );

    return (
        <div className="App">
            {tileComponents}
            {cityComponents}
            {/*{cameraComponent}*/}
        </div>
    );
};

const mapStateToProps = (state: ClientState): StateProps => {
    return {
        camera: state.camera,
        cities: Object.keys(state.citiesById).map(cityId => state.citiesById[cityId]),
        tiles: state.tiles
    };
};

const mapDispatchToProps = (dispatch: Dispatch<Action>): DispatchProps => {
    return {
        moveCameraUp: () => dispatch(moveCameraUp()),
        moveCameraDown: () => dispatch(moveCameraDown()),
        moveCameraLeft: () => dispatch(moveCameraLeft()),
        moveCameraRight: () => dispatch(moveCameraRight()),
        zoomCameraIn: () => dispatch(zoomCameraIn()),
        zoomCameraOut: () => dispatch(zoomCameraOut()),
    };
};

export const WorldMapComponent = connect<Props, OwnProps, StateProps, DispatchProps, ClientState, Dispatch<Action>>(mapStateToProps, mapDispatchToProps)(Component);
