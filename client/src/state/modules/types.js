// @flow

import { emptyCameraState } from './camera/reducer/types';
import { emptyMenuState } from './menu/reducer/types';
import { emptyTilesState } from './tiles/reducer/types';
import { emptyPlayerState } from './player/reducer/types';
import { emptyCommonState } from '../../../../common/src/state';
import type { ClientAction } from '../actions';
import type { ClientState } from './root';
import { emptyCommonStateState } from './common-state/reducer/types';


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