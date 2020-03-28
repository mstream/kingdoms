// @flow


import type { ClientActionCreator } from '../../../../types';
import type { ClientReportErrorsAction } from './types';
import { REPORT_ERRORS } from './types';


const reportErrors: ClientActionCreator<ClientReportErrorsAction> = (payload) => {
    return {
        type: REPORT_ERRORS,
        payload,
    };
};

export const errorsActions = {
    reportErrors,
};