// @flow


import { reportErrorsErrorsReducer } from './report-errors';
import { unsupportedActionReducer } from '../../unsupported-action-reducer';
import type { ClientStateErrors } from './types';
import type { ClientState } from '../../types';
import type { ClientAction } from '../../../types';
import { REPORT_ERRORS } from '../actions/types';
import { initialErrorsState } from './state';

export const errorsReducer = (
    localState: ClientStateErrors = initialErrorsState,
    action: ClientAction,
    globalState: ClientState,
): ClientStateErrors => {
    switch (action.type) {
        case REPORT_ERRORS: {
            return reportErrorsErrorsReducer({
                action,
                globalState,
                localState,
            });
        }
        default: {
            return unsupportedActionReducer({
                action,
                globalState,
                localState,
            });
        }
    }
};
