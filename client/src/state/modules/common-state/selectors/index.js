// @flow

import type { ClientState } from '../../root';
import type { ClientStateCommonState } from '../reducer/types';

export const commonStateSelector = (state: ClientState): ClientStateCommonState => {
    return state.commonState;
};
