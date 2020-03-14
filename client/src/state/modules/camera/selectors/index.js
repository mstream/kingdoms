// @flow


import type { ClientState } from '../../root';
import type { ClientStateCamera } from '../reducer/types';

export const cameraSelector = (state: ClientState): ClientStateCamera => {
    return state.camera;
};
