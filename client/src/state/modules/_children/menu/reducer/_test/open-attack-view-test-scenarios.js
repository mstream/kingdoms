// @flow

import {
    clientActions,
} from '../../../../actions';
import {
    emptyCityState,
} from '../../../../../../../../common/src/state/modules/_children/cities/reducer/state';
import {
    emptyClientState,
} from '../../../../../state';
import {
    emptyCommonState,
} from '../../../../../../../../common/src/state/modules/state';
import type {
    ClientOpenAttackViewAction,
} from '../../actions/types';
import type {
    ClientStateMenuReducerTestScenario,
} from './types';

type Scenarios = $ReadOnlyArray< ClientStateMenuReducerTestScenario< ClientOpenAttackViewAction >, >;

export const openAttackViewTestScenarios: Scenarios = [
    {
        action: clientActions.menu.openAttackView(
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
                    attackedCityId: `city2`,
                },
            };

        },
        name               : `opens attack view`,
        previousGlobalState: {
            ...emptyClientState,
            commonState: {
                ...emptyCommonState,
                cities: {
                    city1: {
                        ...emptyCityState,
                        ownerId: `player1`,
                    },
                    city2: {
                        ...emptyCityState,
                        ownerId: `player2`,
                    },
                },
            },
            menu: {
                ...emptyClientState.menu,
                attackView: {
                    ...emptyClientState.menu.attackView,
                    attackedCityId: null,
                },
            },
            player: {
                name: `player1`,
            },
        },
    },
];
