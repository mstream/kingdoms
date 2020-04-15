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
    CommonStateRules,
} from '../../../../../../../../common/src/state/modules/rules/reducer/types';

export const rulesSelector: ClientStateSelector< ?CommonStateRules > = createClientStateCommonStateSelector(
    {
        commonStateSelector: commonStateRulesSelectors.rules,
    },
);
