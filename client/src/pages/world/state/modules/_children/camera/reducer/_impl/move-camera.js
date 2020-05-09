// @flow

import {
    addVectors,
    multipleVectors,
} from '../../../../../../../../../../common/src/vector';
import {
    clientStateSelectors,
} from '../../../../selectors';
import {
    clipToBoundary,
} from '../../../../../../../../../../common/src/boundary';
import type {
    ClientMoveCameraAction,
} from '../../actions/types';
import type {
    ClientStateActionReducer,
} from '../../../../../types';
import type {
    ClientStateCamera,
} from '../types';

type Reducer = ClientStateActionReducer< ClientStateCamera,
    ClientMoveCameraAction, >;

export const moveCameraCameraReducer: Reducer = (
    {
        action,
        localState,
        globalState,
    },
) => {

    if ( clientStateSelectors.menu.isAnyMenuOpen(
        globalState,
    ) ) {

        return localState;

    }

    const newCameraLocation = clipToBoundary(
        {
            boundary: localState.locationLimit,
            vector  : addVectors(
                {
                    vector1: localState.geometry.location,
                    vector2: multipleVectors(
                        {
                            vector1: localState.geometry.size,
                            vector2: multipleVectors(
                                {
                                    vector1: localState.movementSpeed,
                                    vector2: action.payload.vector,
                                },
                            ),
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
            location: newCameraLocation,
        },
    };

};
