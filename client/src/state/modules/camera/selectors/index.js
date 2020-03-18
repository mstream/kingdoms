// @flow


import type { ClientStateCamera } from '../reducer/types';
import type { ClientState } from '../../types';

export const cameraSelector = (state: ClientState): ClientStateCamera => {
    return state.camera;
};
