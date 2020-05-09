// @flow

import type {
    ClientStateErrors,
} from '../../reducer/types';
import type {
    ClientStateSelector,
} from '../../../../../types';

export const errorsSelector: ClientStateSelector< ClientStateErrors, void > = (
    state,
) => {

    return state.errors;

};
