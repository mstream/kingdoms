// @flow

import type {
    ClientActionCreator,
} from '../../../../types';
import type {
    ClientReportErrorsAction,
} from './types';
import {
    REPORT_ERRORS,
} from './types';

const reportErrors: ClientActionCreator< ClientReportErrorsAction > = (
    payload,
) => {

    return {
        payload,
        type: REPORT_ERRORS,
    };

};

export const errorsActions = {
    reportErrors,
};
