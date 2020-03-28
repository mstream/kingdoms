// @flow

import type {
    ClientAction,
    ClientStateReducerTestScenario,
} from '../../../../../types';
import type { ClientStateCommonState } from '../types';

export type ClientStateCommonStateReducerTestScenario<+A: ClientAction> = ClientStateReducerTestScenario<ClientStateCommonState, A>;