// @flow


import type { ClientStateErrors } from '../types';
import type { ClientStateActionReducer } from '../../../types';
import type { ClientReportErrorsAction } from '../../actions/types';

type Reducer = ClientStateActionReducer<ClientStateErrors, ClientReportErrorsAction>;

export const reportErrorsErrorsReducer: Reducer = (
    {
        action,
        globalState,
        localState,
    },
) => {
    return [
        ...localState,
        ...action.payload,
    ];
};
