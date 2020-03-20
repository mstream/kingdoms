// @flow

import type { ClientAction } from '../../../actions';
import type { ClientStateReducerTestScenario } from '../../types';

export type ClientStatePlayerReducerTestScenario<+A: ClientAction> = ClientStateReducerTestScenario<ClientStatePlayer, A>;

export type ClientStatePlayer = $ReadOnly<{
    name: ?string,
}>;

export const emptyPlayerState: ClientStatePlayer = {
    name: null,
};
