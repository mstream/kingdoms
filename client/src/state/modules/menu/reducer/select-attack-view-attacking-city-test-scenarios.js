// @flow


import type { ClientStateMenuReducerTestScenario } from './types';
import { emptyClientState } from '../../types';
import type { ClientSelectAttackViewAttackingCityAction } from '../actions';
import { selectAttackViewAttackingCity } from '../actions';

export const selectAttackViewAttackingCityTestScenarios: $ReadOnlyArray<ClientStateMenuReducerTestScenario<ClientSelectAttackViewAttackingCityAction>> = [
    {
        name: 'select attack view attacking city',
        action: selectAttackViewAttackingCity({ cityId: '2' }),
        previousGlobalState: {
            ...emptyClientState,
            menu: {
                ...emptyClientState.menu,
                attackView: {
                    ...emptyClientState.menu.attackView,
                    attackingCityId: '1',
                },
            },
        },
        expectedLocalStateCreator: ({ previousLocalState }) => {
            return {
                ...previousLocalState,
                attackView: {
                    ...previousLocalState.attackView,
                    attackingCityId: '2',
                },
            };
        },
    },
];
