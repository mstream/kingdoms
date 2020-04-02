// @flow

import type {
    ClientAction,
    ClientStateReducerTestScenario,
} from '../../../../../types';
import type { ClientStateTiles } from '../types';

export type ClientStateTilesReducerTestScenario<
    +A: ClientAction,
> = ClientStateReducerTestScenario<ClientStateTiles, A>;
