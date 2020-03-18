// @flow

import type { ClientStateCommonState } from '../reducer/types';
import type { ClientState } from '../../types';

export const commonStateSelector = (state: ClientState): ClientStateCommonState => {
    return state.commonState;
};
