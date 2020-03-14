// @flow

import { updateStateMenuReducer } from './update-state';
import { closeCityView, openAttackView } from '../../actions';
import type { ClientState, ClientStateMenu } from '../../state';
import { emptyClientState } from '../../state';
import {
    emptyCityState,
    emptyCommonState,
} from '../../../../../common/src/state';
import { openAttackViewMenuReducer } from './open-attack-view';
import type { ClientStateReducerTestScenario } from '../root';
import type {
    ClientCloseCityViewAction,
    ClientOpenAttackViewAction,
} from '../../actions';

export const openAttackViewTestScenarios: $ReadOnlyArray<ClientStateReducerTestScenario<ClientStateMenu, ClientOpenAttackViewAction>> = [
    {
        name: 'opens attack view',
        action:  openAttackView({ cityId: '2' }),
        previousGlobalState: {
            ...emptyClientState,
            player: {
                name: 'player1',
            },
            commonState: {
                ...emptyCommonState,
                cities: {
                    '1': {
                        ...emptyCityState,
                        ownerId: 'player1',
                    },
                    '2': {
                        ...emptyCityState,
                        ownerId: 'player2',
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
        },
        expectedLocalStateCreator: ({ previousLocalState }) => {
            return {
                ...previousLocalState,
                attackView: {
                    ...previousLocalState.attackView,
                    attackedCityId: '2',
                },
            };
        },
    },
];

