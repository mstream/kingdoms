// @flow

import type { ClientCloseAttackViewAction } from '../../actions';
import { closeAttackView } from '../../actions';
import type { ClientStateMenu } from '../../state';
import { emptyClientState } from '../../state';
import {
    emptyRegimentState,
    UNIT_PIKEMAN,
} from '../../../../../common/src/state';
import type { ClientStateReducerTestScenario } from '../root';


export const closeAttackViewTestScenarios: $ReadOnlyArray<ClientStateReducerTestScenario<ClientStateMenu, ClientCloseAttackViewAction>> = [
    {
        name: 'closes attack view',
        action: closeAttackView(),
        previousGlobalState: {
            ...emptyClientState,
            menu: {
                ...emptyClientState.menu,
                attackView: {
                    ...emptyClientState.menu.attackView,
                    attackedCityId: '1',
                    attackingCityId: '2',
                    regiment: {
                        ...emptyRegimentState,
                        [UNIT_PIKEMAN]: {
                            from: 10,
                            to: 100,
                        },
                    },
                },
            },
        },
        expectedLocalStateCreator: ({ previousLocalState }) => {
            return {
                ...previousLocalState,
                attackView: emptyClientState.menu.attackView,
            };
        },
    },
];
