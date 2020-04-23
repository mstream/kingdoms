// @flow

import {
    commonStateRulesSelectors,
} from '../../../../../../../../common/src/state/modules/_children/rules/selectors';
import {
    createClientStateCommonStateSelector,
} from '../utils';
import type {
    ClientStateSelector,
} from '../../../../../types';
import type {
    CommonStateRules,
} from '../../../../../../../../common/src/state/modules/_children/rules/reducer/types';

export const rulesSelector: ClientStateSelector< ?CommonStateRules, void >
    = createClientStateCommonStateSelector(
        {
            commonStateSelector: commonStateRulesSelectors.rules,
        },
    );
