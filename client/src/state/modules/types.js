// @flow

import type { ClientStateCamera } from './camera/reducer/types';
import type { ClientStateMenu } from './menu/reducer/types';
import type { ClientStateTiles } from './tiles/reducer/types';
import type { ClientStatePlayer } from './player/reducer/types';
import type { ClientStateCommonState } from './common-state/reducer/types';
import type { ClientStateErrors } from './errors/reducer/types';
import type { ClientAction } from '../types';
import { emptyCameraState, initialCameraState } from './camera/reducer/state';
import {
    emptyCommonStateState,
    initialCommonStateState,
} from './common-state/reducer/state';
import { emptyErrorsState, initialErrorsState } from './errors/reducer/state';
import { emptyMenuState, initialMenuState } from './menu/reducer/state';
import { emptyPlayerState, initialPlayerState } from './player/reducer/state';
import { emptyTilesState, initialTilesState } from './tiles/reducer/state';

export type ClientState = {
    camera: ClientStateCamera,
    errors: ClientStateErrors,
    menu: ClientStateMenu,
    player: ClientStatePlayer,
    commonState: ClientStateCommonState,
    tiles: ClientStateTiles,
};

export type ClientStateReducerTestScenario<S, +A: ClientAction> = $ReadOnly<{
    name: string,
    action: A,
    previousGlobalState: ClientState,
    expectedLocalStateCreator: ({ previousLocalState: S }) => S,
}>;

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
