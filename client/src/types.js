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

export type CitySelectedAction = {
    type: 'CITY_VIEW_OPENED',
    payload: string
}

export type Action =
    ServerStateUpdated
    | CameraMovedAction
    | CameraZoomedAction
    | CitySelectedAction