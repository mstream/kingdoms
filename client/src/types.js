/**
 * @flow
 */

export type GeometryStyle = {
    height: number,
    width: number,
    marginTop: number,
    marginLeft: number,
};

export type Vector = {
    x: number,
    y: number,
}

export type TileType = 'PLAINS';

export type Tile = {
    geometry: Geometry,
    index: Vector,
    type: TileType,
};

export type Geometry = {
    location: Vector,
    size: Vector
};

export type Camera = {
    debugColor: string,
    geometry: Geometry,
    movementSpeed: Vector,
    zoomingSpeed: Vector,
};

export type City = {
    geometry: Geometry,
    id: string,
    name: string,
};

export type World = {
    cities: $ReadOnlyArray<City>,
    debugColor: string,
    tiles: $ReadOnlyArray<Tile>,
    tileSize: Vector,
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