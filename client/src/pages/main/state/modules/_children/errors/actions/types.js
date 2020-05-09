// @flow

import type {
    BaseAction,
} from '../../../../../../../../../common/src/types/actions';

export const REPORT_ERRORS: 'REPORT_ERRORS' = `REPORT_ERRORS`;

export type ClientReportErrorsAction = BaseAction< typeof REPORT_ERRORS,
    $ReadOnlyArray< string >, >;
