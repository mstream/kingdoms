// @flow

import type {
    CommonStateSelector,
} from '../../../../types';
import type {
    CommonStateTime,
} from '../../reducer/types';

export const timeSelector: CommonStateSelector< CommonStateTime, void > = (
    state,
) => {

    return state.time;

};
