// @flow

import { clipToBoundary } from '../../../../../../common/src/boundary';
import {
    addVectors,
    multipleVectors,
} from '../../../../../../common/src/vector';
import { isAnyMenuOpen } from '../../../selectors';
import type { ClientStateCamera } from './types';
import type { ClientStateActionReducer } from '../../types';
import type { ClientMoveCameraAction } from '../actions/types';

type Reducer = ClientStateActionReducer<ClientStateCamera, ClientMoveCameraAction>;

export const moveCameraCameraReducer: Reducer = (
    {
        action,
        localState,
        globalState,
    },
) => {
    if (isAnyMenuOpen(globalState)) {
        return localState;
    }

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
