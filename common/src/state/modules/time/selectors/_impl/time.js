// @flow

import type {
    CommonStateSelector,
} from '../../../types';
import type {
    CommonStateTime,
} from '../../reducer/types';

export const timeSelector: CommonStateSelector< CommonStateTime > = (
    state,
) => {

    return state.time;

};
