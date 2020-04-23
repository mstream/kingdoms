// @flow

import type {
    CommonStateSelector,
} from '../../../../types';
import type {
    CommonStateUnitStats,
} from '../../reducer/types';


export const unitStatsSelector: CommonStateSelector< CommonStateUnitStats, void > = (
    state,
) => {

    return state.rules.unitStats;

};
