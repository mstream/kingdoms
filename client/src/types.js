/**
 * @flow
 */

export type GeometryStyle = {
    position: 'absolute',
    height: number,
    width: number,
    marginTop: number,
    marginLeft: number,
};

export type Vector = {
    x: number,
    y: number
}

export type TileType = 'PLAINS';

export type Tile = {
    index: Vector,
    location: Vector,
    type: TileType
}

export type Geometry = {
    location: Vector,
    size: Vector
}

export type Camera = {
    geometry: Geometry,
    movementSpeed: Vector,
    zoomingSpeed: Vector,
}

export type World = {
    tileSize: Vector,
    worldSize: Vector,
    tiles: $ReadOnlyArray<Tile>
};

export type WorldMap = {
    camera: Camera,
    world: World
};

export type State = {
    ui: {
        worldMap: WorldMap
    }
}

export type CameraMovedAction = {
    type: 'CAMERA_MOVED',
    payload: Vector
}

export type CameraZoomedAction = {
    type: 'CAMERA_ZOOMED',
    payload: Vector
}


export type Action = CameraMovedAction | CameraZoomedAction