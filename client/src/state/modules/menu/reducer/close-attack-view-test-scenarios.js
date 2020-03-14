// @flow

import type { ClientCloseAttackViewAction } from '../../../actions';
import { closeAttackView } from '../../../actions';
import {
    emptyRegimentTemplateState,
    UNIT_PIKEMAN,
} from '../../../../../../common/src/state';
import { emptyClientState } from '../../types';
import type { ClientStateMenuReducerTestScenario } from './types';


export const closeAttackViewTestScenarios: $ReadOnlyArray<ClientStateMenuReducerTestScenario<ClientCloseAttackViewAction>> = [
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
                    regimentTemplate: {
                        ...emptyRegimentTemplateState,
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
