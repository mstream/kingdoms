// @flow


import { selectAttackViewAttackingCity } from '../../actions';
import type { ClientStateMenuReducerTestScenario } from './types';
import type { ClientSelectAttackViewAttackingCityAction } from '../../actions/types';
import { emptyClientState } from '../../../state';

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
