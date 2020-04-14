// @flow

import type {
    ClientStateErrorsReducerTestScenario,
} from './types';
import type {
    ClientReportErrorsAction,
} from '../../actions/types';
import {
    emptyClientState,
} from '../../../../../state';
import {
    clientActions,
} from '../../../../actions';

type Scenarios = $ReadOnlyArray< ClientStateErrorsReducerTestScenario< ClientReportErrorsAction >, >;

export const reportErrorsTestScenarios: Scenarios = [
    {
        action: clientActions.errors.reportErrors(
            [
                `error1`,
                `error2`,
            ],
        ),
        expectedLocalStateCreator: (
            {
                previousLocalState,
            },
        ) => {

            return [
                ...previousLocalState,
                `error1`,
                `error2`,
            ];

        },
        name               : `reports errors`,
        previousGlobalState: {
            ...emptyClientState,
            errors: [],
        },
    },
];
