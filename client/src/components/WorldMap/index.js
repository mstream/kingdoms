/**
 * @flow
 */

import React, {useEffect} from 'react';
import type {Dispatch} from 'redux';
import {connect} from 'react-redux';
import './style.css';
import type {
    Action,
    Camera,
    Geometry,
    State,
    Vector,
    WorldMap
} from '../../types';
import {TileComponent} from '../Tile';
import {CityComponent} from '../City';
import {
    moveCameraDown,
    moveCameraLeft,
    moveCameraRight,
    moveCameraUp,
    zoomCameraIn,
    zoomCameraOut
} from '../../actions';
import {
    checkIfIntersect,
    createGeometryStyle,
    scaleVector,
    subtractVectors,
    translateLocation,
    translateSize
} from '../../util';

type OwnProps = {};
type StateProps = { worldMap: WorldMap };
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

const cullObjects = <T: { geometry: Geometry, ... }>({objects, camera}: { objects: $ReadOnlyArray<T>, camera: Camera }): $ReadOnlyArray<T> => {
    return objects.filter(object => {
        return checkIfIntersect({
            geometry1: object.geometry,
            geometry2: camera.geometry,
        });
    });
};

const transformObjectGeometries = <T: { geometry: Geometry }>({objects, cameraWindowGeometry, cameraLocationToWindowCenterLocationVector, desiredCameraSizeToWorldCameraSizeRatioVector}: { objects: $ReadOnlyArray<T>, cameraWindowGeometry: Geometry, cameraLocationToWindowCenterLocationVector: Vector, desiredCameraSizeToWorldCameraSizeRatioVector: Vector }): $ReadOnlyArray<T> => {
    return objects.map(object => {
        const windowGeometry = {
            location: translateLocation({
                location: object.geometry.location,
                vector: cameraLocationToWindowCenterLocationVector
            }),
            size: translateSize({
                size: object.geometry.size,
                vector: desiredCameraSizeToWorldCameraSizeRatioVector
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

const Component = ({worldMap, moveCameraUp, moveCameraDown, moveCameraLeft, moveCameraRight, zoomCameraIn, zoomCameraOut}: Props) => {
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

    const windowSize = {
        x: window.innerWidth,
        y: window.innerHeight
    };

    const windowCenterLocation = scaleVector({vector: windowSize, scalar: 0.5});

    const cameraLocationToWindowCenterLocationVector = subtractVectors({
        vector1: windowCenterLocation,
        vector2: worldMap.camera.geometry.location
    });

    const desiredCameraSizeToWorldCameraSizeRatioVector = {
        x: window.innerWidth / worldMap.camera.geometry.size.x * 0.75,
        y: window.innerHeight / worldMap.camera.geometry.size.y * 0.75,
    };

    const visibleTiles = cullObjects({
        camera: worldMap.camera,
        objects: worldMap.world.tiles,
    });

    const visibleCities = cullObjects({
        camera: worldMap.camera,
        objects: worldMap.world.cities,
    });

    const cameraWindowGeometry = {
        location: translateLocation({
            location: worldMap.camera.geometry.location,
            vector: cameraLocationToWindowCenterLocationVector
        }),
        size: translateSize({
            size: worldMap.camera.geometry.size,
            vector: desiredCameraSizeToWorldCameraSizeRatioVector
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
                debugColor={worldMap.world.debugColor}
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

    const style = {
        ...createGeometryStyle({
            geometry: cameraWindowGeometry
        }),
        borderStyle: 'solid',
        borderColor: worldMap.camera.debugColor,
        zIndex: 2
    };

    const camera = (
        <div style={style}>
        </div>
    );

    return (
        <div className="App">
            {tileComponents}
            {cityComponents}
            {camera}
        </div>
    );
};

const mapStateToProps = (state: State): StateProps => {
    return Object.freeze({
        worldMap: state.ui.worldMap
    });
};

const mapDispatchToProps = (dispatch: Dispatch<Action>): DispatchProps => {
    return Object.freeze({
        moveCameraUp: () => dispatch(moveCameraUp()),
        moveCameraDown: () => dispatch(moveCameraDown()),
        moveCameraLeft: () => dispatch(moveCameraLeft()),
        moveCameraRight: () => dispatch(moveCameraRight()),
        zoomCameraIn: () => dispatch(zoomCameraIn()),
        zoomCameraOut: () => dispatch(zoomCameraOut()),
    });
};

export const WorldMapComponent = connect<Props, OwnProps, StateProps, DispatchProps, State, Dispatch<Action>>(mapStateToProps, mapDispatchToProps)(Component);
