// @flow

import {
    zeroVector,
} from '../../../../../../../common/src/vector';
import type {
    ClientStateCamera,
} from './types';

export const emptyCameraState: ClientStateCamera = {
    geometry: {
        location: zeroVector,
        size    : zeroVector,
    },
    locationLimit: {
        max: zeroVector,
        min: zeroVector,
    },
    movementSpeed: zeroVector,
    sizeLimit    : {
        max: zeroVector,
        min: zeroVector,
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
        max: zeroVector,
        min: zeroVector,
    },
    movementSpeed: {
        x: 0.1,
        y: 0.1,
    },
    sizeLimit: {
        max: {
            x: 3200,
            y: 2000,
        },
        min: {
            x: 640,
            y: 400,
        },
    },
    zoomingSpeed: {
        x: 100,
        y: 100,
    },
};
