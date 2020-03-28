// @flow


import { createSelector } from 'reselect';
import type { ClientStateErrors } from '../../reducer/types';
import { errorsSelector } from './errors';
import type { ClientState, ClientStateSelector } from '../../../../../types';


export const anyErrorsSelector: ClientStateSelector<boolean> =
    createSelector<ClientState, void, boolean, ClientStateErrors>(
        errorsSelector,
        (errors) => {
            return errors.length > 0;
        },
    );