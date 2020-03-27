// @flow

import type { ClientStateSelector } from '../../../types';
import type { ClientStateCommonState } from '../../reducer/types';

export const commonStateSelector: ClientStateSelector<ClientStateCommonState> = (state) => {
    return state.commonState;
};
