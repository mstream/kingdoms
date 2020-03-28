// @flow


import type { ClientStateMenuReducerTestScenario } from './types';
import type { ClientUpdateAttackViewMinimumDelayAction } from '../../actions/types';
import { emptyClientState } from '../../../../../state';
import { clientActions } from '../../../../actions';

export const updateAttackViewMinimumDelayTestScenarios: $ReadOnlyArray<ClientStateMenuReducerTestScenario<ClientUpdateAttackViewMinimumDelayAction>> = [
    {
        name: 'updates the minimum delay',
        action: clientActions.menu.updateAttackViewMinimumDelay({
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
