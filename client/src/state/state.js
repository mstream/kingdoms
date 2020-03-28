// @flow

import { emptyCameraState, initialCameraState } from './modules/_children/camera/reducer/state';
import { emptyErrorsState, initialErrorsState } from './modules/_children/errors/reducer/state';
import { emptyMenuState, initialMenuState } from './modules/_children/menu/reducer/state';
import { emptyPlayerState, initialPlayerState } from './modules/_children/player/reducer/state';
import {
    emptyCommonStateState,
    initialCommonStateState,
} from './modules/_children/common-state/reducer/state';
import { emptyTilesState, initialTilesState } from './modules/_children/tiles/reducer/state';
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