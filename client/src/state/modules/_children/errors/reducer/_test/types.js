// @flow

import type {
    ClientAction,
    ClientStateReducerTestScenario,
} from '../../../../../types';
import type {
    ClientStateErrors,
} from '../types';

export type ClientStateErrorsReducerTestScenario<+A: ClientAction,
    > = ClientStateReducerTestScenario< ClientStateErrors, A >;
