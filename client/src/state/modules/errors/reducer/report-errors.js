// @flow


import type { ClientStateErrors } from './types';
import type { ClientState } from '../../types';
import type { ClientReportErrorsAction } from '../actions/types';

export const reportErrorsErrorsReducer = (
    {
        action,
        globalState,
        localState,
    }: {
        action: ClientReportErrorsAction,
        globalState: ClientState,
        localState: ClientStateErrors,
    },
): ClientStateErrors => {
    return [
        ...localState,
        ...action.payload,
    ];
};
