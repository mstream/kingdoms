/**
 * @flow
 */

import React, {useEffect} from 'react';
import type {Dispatch} from 'redux';
import {connect} from 'react-redux';
import './style.css';
import type {Action, Camera, State, Tile, Vector, WorldMap} from '../../types';
import {TileComponent} from '../Tile';
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

type OwnProps = {||};
type StateProps = {| worldMap: WorldMap |};
type DispatchProps = {|
    moveCameraUp: () => mixed,
    moveCameraDown: () => mixed,
    moveCameraLeft: () => mixed,
    moveCameraRight: () => mixed,
    zoomCameraIn: () => mixed,
    zoomCameraOut: () => mixed,
|};

type Props = {
    ...OwnProps,
    ...StateProps,
    ...DispatchProps
}

const cullTiles = ({tiles, tileSize, camera}: { tiles: $ReadOnlyArray<Tile>, tileSize: Vector, camera: Camera }) => {
    return tiles.filter(tile => {
        return checkIfIntersect({
            geometry1: {
                location: tile.location,
                size: tileSize
            }, geometry2: camera.geometry
        });
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

    const visibleTiles = cullTiles({
        tiles: worldMap.world.tiles,
        tileSize: worldMap.world.tileSize,
        camera: worldMap.camera
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

    const tileComponents = visibleTiles.map(tile => {

        const tileWindowGeometry = {
            location: translateLocation({
                location: tile.location,
                vector: cameraLocationToWindowCenterLocationVector
            }),
            size: translateSize({
                size: worldMap.world.tileSize,
                vector: desiredCameraSizeToWorldCameraSizeRatioVector
            }),
        };

        const distanceFromWindowCameraCenter = subtractVectors({
            vector1: tileWindowGeometry.location,
            vector2: cameraWindowGeometry.location
        });

        const zoomedLocation = {
            x: cameraWindowGeometry.location.x + distanceFromWindowCameraCenter.x * desiredCameraSizeToWorldCameraSizeRatioVector.x,
            y: cameraWindowGeometry.location.y + distanceFromWindowCameraCenter.y * desiredCameraSizeToWorldCameraSizeRatioVector.y,
        };

        return (
            <TileComponent
                key={`${tile.index.x}-${tile.index.y}`}
                geometry={{
                    location: zoomedLocation,
                    size: tileWindowGeometry.size,
                }}
                tile={tile}
            />
        );
    });

    const style = {
        ...createGeometryStyle({
            debugColor: 'rgba(255,0,0,0.5)',
            geometry: cameraWindowGeometry
        }),
        zIndex: 1
    };

    const camera = (
        <div style={style}>
        </div>
    );

    return (
        <div className="App">
            {tileComponents}
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
