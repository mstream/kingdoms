// @flow

import { clipToBoundary } from '../../../../../../common/src/boundary';
import {
    addVectors,
    multipleVectors,
} from '../../../../../../common/src/vector';
import { isAnyMenuOpen } from '../../../selectors';
import type { ClientStateActionReducer } from '../../types';
import type { ClientStateCamera } from './types';
import type {
    ClientMoveCameraAction,
    ClientZoomCameraAction,
} from '../actions/types';

type Reducer = ClientStateActionReducer<ClientStateCamera, ClientZoomCameraAction>;

export const zoomCameraCameraReducer: Reducer = (
    {
        localState,
        action,
        globalState,
    },
) => {
    if (isAnyMenuOpen(globalState)) {
        return localState;
    }

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
