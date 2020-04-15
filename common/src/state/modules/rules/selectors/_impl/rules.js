// @flow

import type {
    CommonStateRules,
} from '../../../rules/reducer/types';
import type {
    CommonStateSelector,
} from '../../../types';

export const rulesSelector: CommonStateSelector< CommonStateRules > = (
    state,
) => {

    return state.rules;

};
