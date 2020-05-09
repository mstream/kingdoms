// @flow

import type {
    ClientAction,
    ClientStateReducerTestScenario,
} from '../../../../../types';
import type {
    ClientStateWorlds,
} from '../types';

export type ClientStateErrorsReducerTestScenario<+A: ClientAction,
    > = ClientStateReducerTestScenario< ClientStateWorlds, A >;
