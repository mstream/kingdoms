// @flow

import { emptyCameraState } from './camera/reducer/types';
import { emptyMenuState } from './menu/reducer/types';
import { emptyTilesState } from './tiles/reducer/types';
import { emptyPlayerState } from './player/reducer/types';
import type { ClientAction } from '../actions';
import { emptyCommonStateState } from './common-state/reducer/types';
import { initialCameraState } from './camera/reducer';
import { initialMenuState } from './menu/reducer';
import { initialPlayerState } from './player/reducer';
import { initialCommonStateState } from './common-state/reducer';
import { initialTilesState } from './tiles/reducer';


export const initialClientState = {
    camera: initialCameraState,
    menu: initialMenuState,
    player: initialPlayerState,
    commonState: initialCommonStateState,
    tiles: initialTilesState,
};

export type ClientState = typeof initialClientState;

export type ClientStateReducerTestScenario<S, A: ClientAction> = {
    name: string,
    action: A,
    previousGlobalState: ClientState,
    expectedLocalStateCreator: ({ previousLocalState: S }) => S,
};

export type ClientStateTestScenario<A: ClientAction> = ClientStateReducerTestScenario<ClientState, A>;

export const emptyClientState: ClientState = {
    camera: emptyCameraState,
    menu: emptyMenuState,
    player: emptyPlayerState,
    commonState: emptyCommonStateState,
    tiles: emptyTilesState,
};

