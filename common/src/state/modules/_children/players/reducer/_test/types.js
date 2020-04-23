// @flow

import type {
    CommonAction,
} from '../../../../../types';
import type {
    CommonStatePlayers,
} from '../types';
import type {
    CommonStateReducerTestScenario,
} from '../../../../types';

export type CommonStatePlayersReducerTestScenario<+A: CommonAction,
    > = CommonStateReducerTestScenario< CommonStatePlayers, A >;
