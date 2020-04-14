// @flow

import type {
    CommonStateSelector,
} from '../../../types';
import type {
    CommonStateRules,
} from '../../../rules/reducer/types';

export const rulesSelector: CommonStateSelector< CommonStateRules > = (
    state,
) => {

    return state.rules;

};
