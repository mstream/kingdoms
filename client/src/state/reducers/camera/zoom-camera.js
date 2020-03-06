// @flow

import type { ClientState, ClientStateCamera } from '../../state';
import type { ClientZoomCameraAction } from '../../actions';
import { clipToBoundary } from '../../../../../common/src/boundary';
import { addVectors, multipleVectors } from '../../../../../common/src/vector';

export const zoomCameraCameraReducer = (
    {
        localState,
        action,
        globalState,
    }:
        {
            localState: ClientStateCamera,
            action: ClientZoomCameraAction,
            globalState: ClientState,
        },
): ClientStateCamera => {
    const newCameraSize = clipToBoundary({
        vector: addVectors({
            vector1: localState.geometry.size,
            vector2: multipleVectors({
                vector1: localState.zoomingSpeed,
                vector2: action.payload.vector,
            }),
        }),
        boundary: localState.sizeLimit,
    });

    return {
        ...localState,
        geometry: {
            ...localState.geometry,
            size: newCameraSize,
        },
    };
};
