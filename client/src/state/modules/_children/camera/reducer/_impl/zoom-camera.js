// @flow

import {
    clipToBoundary,
} from '../../../../../../../../common/src/boundary';
import {
    addVectors,
    multipleVectors,
} from '../../../../../../../../common/src/vector';
import type {
    ClientStateCamera,
} from '../types';
import type {
    ClientZoomCameraAction,
} from '../../actions/types';
import type {
    ClientStateActionReducer,
} from '../../../../../types';
import {
    clientStateSelectors,
} from '../../../../selectors';

type Reducer = ClientStateActionReducer< ClientStateCamera,
    ClientZoomCameraAction, >;

export const zoomCameraCameraReducer: Reducer = (
    {
        localState,
        action,
        globalState,
    },
) => {

    if ( clientStateSelectors.menu.isAnyMenuOpen(
        globalState,
    ) ) {

        return localState;

    }

    const newCameraSize = clipToBoundary(
        {
            boundary: localState.sizeLimit,
            vector  : addVectors(
                {
                    vector1: localState.geometry.size,
                    vector2: multipleVectors(
                        {
                            vector1: localState.zoomingSpeed,
                            vector2: action.payload.vector,
                        },
                    ),
                },
            ),
        },
    );

    return {
        ...localState,
        geometry: {
            ...localState.geometry,
            size: newCameraSize,
        },
    };

};
