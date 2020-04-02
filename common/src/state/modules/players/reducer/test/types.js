// @flow

import type { CommonStateReducerTestScenario } from '../../../types';
import type { CommonAction } from '../../../../types';
import type { CommonStatePlayers } from '../types';

export type CommonStatePlayersReducerTestScenario<
    +A: CommonAction,
> = CommonStateReducerTestScenario<CommonStatePlayers, A>;
