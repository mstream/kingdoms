// @flow


import { reportErrors } from '../../actions';
import type { ClientStateErrorsReducerTestScenario } from './types';
import type { ClientReportErrorsAction } from '../../actions/types';
import { emptyClientState } from '../../../state';


export const reportErrorsTestScenarios: $ReadOnlyArray<ClientStateErrorsReducerTestScenario<ClientReportErrorsAction>> = [
    {
        name: 'reports errors',
        action: reportErrors(['error1', 'error2']),
        previousGlobalState: {
            ...emptyClientState,
            errors: [],
        },
        expectedLocalStateCreator: ({ previousLocalState }) => {
            return [
                ...previousLocalState,
                'error1',
                'error2',
            ];
        },
    },
];