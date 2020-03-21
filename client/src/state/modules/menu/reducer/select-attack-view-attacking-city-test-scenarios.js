// @flow


import type { ClientStateMenuReducerTestScenario } from './types';
import { emptyClientState } from '../../types';
import type { ClientSelectAttackViewAttackingCityAction } from '../actions';
import { selectAttackViewAttackingCity } from '../actions';

export const selectAttackViewAttackingCityTestScenarios: $ReadOnlyArray<ClientStateMenuReducerTestScenario<ClientSelectAttackViewAttackingCityAction>> = [
    {
        name: 'select attack view attacking city',
        action: selectAttackViewAttackingCity({ cityId: 'city2' }),
        previousGlobalState: {
            ...emptyClientState,
            menu: {
                ...emptyClientState.menu,
                attackView: {
                    ...emptyClientState.menu.attackView,
                    attackingCityId: 'city1',
                },
            },
        },
        expectedLocalStateCreator: ({ previousLocalState }) => {
            return {
                ...previousLocalState,
                attackView: {
                    ...previousLocalState.attackView,
                    attackingCityId: 'city2',
                },
            };
        },
    },
];
