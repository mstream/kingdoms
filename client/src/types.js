/**
 * @flow
 */

import type {ServerState, Vector} from '../../common/src/types';

export type GeometryStyle = {
    height: number,
    width: number,
    marginTop: number,
    marginLeft: number,
};

export type ServerStateUpdated = {
    type: 'SERVER_STATE_UPDATED',
    payload: ServerState
}

export type CameraMovedAction = {
    type: 'CAMERA_MOVED',
    payload: Vector
}

export type CameraZoomedAction = {
    type: 'CAMERA_ZOOMED',
    payload: Vector
}

export type CityViewOpenedAction = {
    type: 'CITY_VIEW_OPENED',
    payload: string
}

export type CityViewClosedAction = {
    type: 'CITY_VIEW_CLOSED'
}

export type Action =
    ServerStateUpdated
    | CameraMovedAction
    | CameraZoomedAction
    | CityViewOpenedAction
    | CityViewClosedAction
