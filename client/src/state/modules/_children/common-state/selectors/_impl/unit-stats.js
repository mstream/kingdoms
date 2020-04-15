// @flow

import {
    commonStateRulesSelectors,
} from '../../../../../../../../common/src/state/modules/rules/selectors';
import {
    createClientStateCommonStateSelector,
} from '../utils';
import type {
    ClientStateSelector,
} from '../../../../../types';
import type {
    CommonStateUnitStats,
} from '../../../../../../../../common/src/state/modules/rules/reducer/types';

export const unitStatsSelector: ClientStateSelector< ?CommonStateUnitStats >
    = createClientStateCommonStateSelector(
        {
            commonStateSelector: commonStateRulesSelectors.unitStats,
        },
    );
