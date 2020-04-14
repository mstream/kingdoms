// @flow

import type {
    ClientStateMenuReducerTestScenario,
} from './types';
import type {
    ClientSelectAttackViewAttackingCityAction,
} from '../../actions/types';
import {
    emptyClientState,
} from '../../../../../state';
import {
    menuActions,
} from '../../actions';

type Scenarios = $ReadOnlyArray< ClientStateMenuReducerTestScenario< ClientSelectAttackViewAttackingCityAction >, >;

export const selectAttackViewAttackingCityTestScenarios: Scenarios = [
    {
        action: menuActions.selectAttackViewAttackingCity(
            {
                cityId: `city2`,
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
                    attackingCityId: `city2`,
                },
            };

        },
        name               : `select attack view attacking city`,
        previousGlobalState: {
            ...emptyClientState,
            menu: {
                ...emptyClientState.menu,
                attackView: {
                    ...emptyClientState.menu.attackView,
                    attackingCityId: `city1`,
                },
            },
        },
    },
];
