// @flow

import {
    createSelector,
} from 'reselect';
import {
    errorsSelector,
} from './errors';
import type {
    ClientState, ClientStateSelector,
} from '../../../../../types';
import type {
    ClientStateErrors,
} from '../../reducer/types';

export const anyErrorsSelector: ClientStateSelector< boolean, void > = createSelector<ClientState,
    void,
    boolean,
    ClientStateErrors,
    >(
        errorsSelector,
        (
            errors,
        ) => {

            return errors.length > 0;

        },
    );
