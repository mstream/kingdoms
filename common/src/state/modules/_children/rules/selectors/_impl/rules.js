// @flow

import type {
    CommonStateRules,
} from '../../reducer/types';
import type {
    CommonStateSelector,
} from '../../../../types';


export const rulesSelector: CommonStateSelector< CommonStateRules, void > = (
    state,
) => {

    return state.rules;

};
