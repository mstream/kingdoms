// @flow

import type { ClientState } from '../../types';
import type { ClientStateErrors } from '../reducer/types';

export const errorsSelector = (state: ClientState): ClientStateErrors => {
    return state.errors;
};
