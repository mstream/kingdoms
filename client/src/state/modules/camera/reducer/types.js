// @flow

import type { ClientAction } from '../../../actions';
import { zeroVector } from '../../../../../../common/src/vector';
import type { ClientStateReducerTestScenario } from '../../types';

export type ClientStateCameraReducerTestScenario<+A: ClientAction> = ClientStateReducerTestScenario<ClientStateCamera, A>;

export const emptyCameraState: ClientStateCamera = {
    locationLimit: {
        min: zeroVector,
        max: zeroVector,
    },
    geometry: {
        location: zeroVector,
        size: zeroVector,
    },
    movementSpeed: zeroVector,
    sizeLimit: {
        min: zeroVector,
        max: zeroVector,
    },
    zoomingSpeed: zeroVector,
};

export type ClientStateCamera = typeof emptyCameraState;
