// @flow


import type { ClientStateErrorsReducerTestScenario } from './types';
import type { ClientReportErrorsAction } from '../../actions/types';
import { emptyClientState } from '../../../../../state';
import { clientActions } from '../../../../actions';

type Scenarios = $ReadOnlyArray<ClientStateErrorsReducerTestScenario<ClientReportErrorsAction>>;

export const reportErrorsTestScenarios: Scenarios = [
    {
        name: 'reports errors',
        action: clientActions.errors.reportErrors([
            'error1',
            'error2',
        ]),
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
