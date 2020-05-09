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

type Selector = ClientStateSelector< boolean, void >;

export const anyErrorsSelector: Selector
    = createSelector<ClientState,
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
