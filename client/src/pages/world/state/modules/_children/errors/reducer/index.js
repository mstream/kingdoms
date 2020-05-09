// @flow

import {
    REPORT_ERRORS,
} from '../actions/types';
import {
    createClientStateReducer,
} from '../../../../utils';
import {
    initialClientState,
} from '../../../../state';
import {
    reportErrorsErrorsReducer,
} from './_impl/report-errors';
import type {
    ClientStateErrors,
} from './types';

export const errorsReducer = createClientStateReducer<ClientStateErrors>(
    {
        actionReducers: {
            [ REPORT_ERRORS ]: reportErrorsErrorsReducer,
        },
        initialState: initialClientState.errors,
    },
);
