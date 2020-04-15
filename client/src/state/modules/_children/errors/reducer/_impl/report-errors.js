// @flow

import type {
    ClientReportErrorsAction,
} from '../../actions/types';
import type {
    ClientStateActionReducer,
} from '../../../../../types';
import type {
    ClientStateErrors,
} from '../types';

type Reducer = ClientStateActionReducer< ClientStateErrors,
    ClientReportErrorsAction, >;

export const reportErrorsErrorsReducer: Reducer = (
    {
        action,
        localState,
    },
) => {

    return [
        ...localState,
        ...action.payload,
    ];

};
