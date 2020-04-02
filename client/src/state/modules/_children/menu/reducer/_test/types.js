// @flow

import type {
    ClientAction,
    ClientStateReducerTestScenario,
} from '../../../../../types';
import type { ClientStateMenu } from '../types';

export type ClientStateMenuReducerTestScenario<
    +A: ClientAction,
> = ClientStateReducerTestScenario<ClientStateMenu, A>;
