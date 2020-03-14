// @flow

import type { ClientAction } from '../../actions';
import type { CommonState } from '../../../../../common/src/state';
import type { ClientStateReducerTestScenario } from '../types';

export type ClientStateCommonState = ?CommonState

export type ClientStateCommonStateReducerTestScenario<A: ClientAction> = ClientStateReducerTestScenario<ClientStateCommonState, A>;

export const emptyCommonStateState: ClientStateCommonState = null;