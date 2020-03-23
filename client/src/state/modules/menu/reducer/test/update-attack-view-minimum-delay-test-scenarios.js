// @flow


import { emptyClientState } from '../../../types';
import { updateAttackViewMinimumDelay } from '../../actions';
import type { ClientStateMenuReducerTestScenario } from './types';
import type { ClientUpdateAttackViewMinimumDelayAction } from '../../actions/types';

export const updateAttackViewMinimumDelayTestScenarios: $ReadOnlyArray<ClientStateMenuReducerTestScenario<ClientUpdateAttackViewMinimumDelayAction>> = [
    {
        name: 'updates the minimum delay',
        action: updateAttackViewMinimumDelay({
            minimumDelay: 60,
        }),
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
        expectedLocalStateCreator: ({ previousLocalState }) => {
            return {
                ...previousLocalState,
                attackView: {
                    ...previousLocalState.attackView,
                    minimumDelay: 60,
                },
            };
        },
    },
];
