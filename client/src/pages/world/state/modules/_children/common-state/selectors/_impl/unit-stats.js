// @flow

import {
    commonStateRulesSelectors,
} from '../../../../../../../../../../common/src/state/modules/_children/rules/selectors';
import {
    createClientStateCommonStateSelector,
} from '../utils';
import type {
    ClientStateSelector,
} from '../../../../../types';
import type {
    CommonStateUnitStats,
} from '../../../../../../../../../../common/src/state/modules/_children/rules/reducer/types';

export const unitStatsSelector: ClientStateSelector< ?CommonStateUnitStats, void >
    = createClientStateCommonStateSelector(
        {
            commonStateSelector: commonStateRulesSelectors.unitStats,
        },
    );
