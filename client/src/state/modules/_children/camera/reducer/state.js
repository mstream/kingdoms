// @flow

import { zeroVector } from '../../../../../../../common/src/vector';
import type { ClientStateCamera } from './types';

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

export const initialCameraState: ClientStateCamera = {
    geometry: {
        location: {
            x: 0,
            y: 0,
        },
        size: {
            x: 1280,
            y: 800,
        },
    },
    locationLimit: {
        min: zeroVector,
        max: zeroVector,
    },
    movementSpeed: {
        x: 0.1,
        y: 0.1,
    },
    sizeLimit: {
        min: { x: 640, y: 400 },
        max: { x: 3200, y: 2000 },
    },
    zoomingSpeed: {
        x: 100,
        y: 100,
    },
};
