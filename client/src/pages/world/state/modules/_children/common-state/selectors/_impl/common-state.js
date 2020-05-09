// @flow

import type {
    ClientStateCommonState,
} from '../../reducer/types';
import type {
    ClientStateSelector,
} from '../../../../../types';

export const commonStateSelector: ClientStateSelector< ClientStateCommonState, void > = (
    state,
) => {

    return state.commonState;

};
