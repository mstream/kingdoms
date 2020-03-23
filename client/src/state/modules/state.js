// @flow

import { emptyCameraState, initialCameraState } from './camera/reducer/state';
import { emptyErrorsState, initialErrorsState } from './errors/reducer/state';
import { emptyMenuState, initialMenuState } from './menu/reducer/state';
import { emptyPlayerState, initialPlayerState } from './player/reducer/state';
import {
    emptyCommonStateState,
    initialCommonStateState,
} from './common-state/reducer/state';
import { emptyTilesState, initialTilesState } from './tiles/reducer/state';
import type { ClientState } from './types';

export const initialClientState = {
    camera: initialCameraState,
    errors: initialErrorsState,
    menu: initialMenuState,
    player: initialPlayerState,
    commonState: initialCommonStateState,
    tiles: initialTilesState,
};

export const emptyClientState: ClientState = {
    camera: emptyCameraState,
    errors: emptyErrorsState,
    menu: emptyMenuState,
    player: emptyPlayerState,
    commonState: emptyCommonStateState,
    tiles: emptyTilesState,
};