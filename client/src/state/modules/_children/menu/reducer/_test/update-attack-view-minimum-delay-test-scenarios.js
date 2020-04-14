// @flow

import type {
    ClientStateMenuReducerTestScenario,
} from './types';
import type {
    ClientUpdateAttackViewMinimumDelayAction,
} from '../../actions/types';
import {
    emptyClientState,
} from '../../../../../state';
import {
    clientActions,
} from '../../../../actions';

type Scenarios = $ReadOnlyArray< ClientStateMenuReducerTestScenario< ClientUpdateAttackViewMinimumDelayAction >, >;

export const updateAttackViewMinimumDelayTestScenarios: Scenarios = [
    {
        action: clientActions.menu.updateAttackViewMinimumDelay(
            {
                minimumDelay: 60,
            },
        ),
        expectedLocalStateCreator: (
            {
                previousLocalState,
            },
        ) => {

            return {
                ...previousLocalState,
                attackView: {
                    ...previousLocalState.attackView,
                    minimumDelay: 60,
                },
            };

        },
        name               : `updates the minimum delay`,
        previousGlobalState: {
            ...emptyClientState,
            menu: {
                ...emptyClientState.menu,
                attackView: {
                    ...emptyClientState.menu.attackView,
                    minimumDelay: 30,
                },
            },
        },
    },
];
