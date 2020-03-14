// @flow

import type { ClientOpenAttackViewAction } from '../../actions';
import { openAttackView } from '../../actions';
import { emptyClientState } from '../../state';
import {
    emptyCityState,
    emptyCommonState,
} from '../../../../../common/src/state';
import type { ClientStateMenuReducerTestScenario } from './index';

export const openAttackViewTestScenarios: $ReadOnlyArray<ClientStateMenuReducerTestScenario<ClientOpenAttackViewAction>> = [
    {
        name: 'opens attack view',
        action: openAttackView({ cityId: '2' }),
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

