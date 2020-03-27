// @flow

import type { ClientStateSelector } from '../../../types';

export const isLoadedSelector: ClientStateSelector<boolean> = (state) => {
    return state.commonState != null;
};
