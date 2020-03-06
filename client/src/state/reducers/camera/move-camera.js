// @flow

import type { ClientState, ClientStateCamera } from '../../state';
import { clipToBoundary } from '../../../../../common/src/boundary';
import { addVectors, multipleVectors } from '../../../../../common/src/vector';
import type { ClientMoveCameraAction } from '../../actions';

export const moveCameraCameraReducer = (
    {
        action,
        localState,
        globalState,
    }:
        {
            localState: ClientStateCamera,
            action: ClientMoveCameraAction,
            globalState: ClientState,
        },
): ClientStateCamera => {
    const newCameraLocation = clipToBoundary({
        vector: addVectors({
            vector1: localState.geometry.location,
            vector2: multipleVectors({
                vector1: localState.geometry.size,
                vector2: multipleVectors({
                    vector1: localState.movementSpeed,
                    vector2: action.payload.vector,
                }),
            }),
        }),
        boundary: localState.locationLimit,
    });

    return {
        ...localState,
        geometry: {
            ...localState.geometry,
            location: newCameraLocation,
        },
    };
};
