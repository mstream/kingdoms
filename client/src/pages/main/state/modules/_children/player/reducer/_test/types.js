// @flow

import type {
    ClientAction,
    ClientStateReducerTestScenario,
} from '../../../../../types';
import type {
    ClientStatePlayer,
} from '../types';

export type ClientStatePlayerReducerTestScenario<+A: ClientAction,
    > = ClientStateReducerTestScenario< ClientStatePlayer, A >;
