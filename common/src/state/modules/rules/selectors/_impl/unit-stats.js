// @flow

import type { CommonStateSelector } from '../../../types';
import type { CommonStateUnitStats } from '../../../rules/reducer/types';

export const unitStatsSelector: CommonStateSelector<CommonStateUnitStats> = (
    state,
) => {
    return state.rules.unitStats;
};
