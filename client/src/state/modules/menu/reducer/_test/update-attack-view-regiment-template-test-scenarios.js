// @flow


import { updateAttackViewRegimentTemplate } from '../../actions';
import {
    UNIT_ARCHER,
    UNIT_PIKEMAN,
} from '../../../../../../../common/src/state/modules/rules/reducer/types';
import type { ClientStateMenuReducerTestScenario } from './types';
import type { ClientUpdateAttackViewRegimentTemplateAction } from '../../actions/types';
import { emptyRegimentTemplateState } from '../../../../../../../common/src/state/modules/orders/reducer/state';
import { emptyClientState } from '../../../state';

export const updateAttackViewRegimentTemplateTestScenarios: $ReadOnlyArray<ClientStateMenuReducerTestScenario<ClientUpdateAttackViewRegimentTemplateAction>> = [
    {
        name: 'updates the regiment template',
        action: updateAttackViewRegimentTemplate({
            regimentTemplate: {
                ...emptyRegimentTemplateState,
                [UNIT_PIKEMAN]: {
                    from: 100,
                    to: 200,
                }
            },
        }),
        previousGlobalState: {
            ...emptyClientState,
            menu: {
                ...emptyClientState.menu,
                attackView: {
                    ...emptyClientState.menu.attackView,
                    regimentTemplate: {
                        ...emptyRegimentTemplateState,
                        [UNIT_ARCHER]: {
                            from: 50,
                            to: 100,
                        }
                    },
                },
            },
        },
        expectedLocalStateCreator: ({ previousLocalState }) => {
            return {
                ...previousLocalState,
                attackView: {
                    ...previousLocalState.attackView,
                    regimentTemplate: {
                        ...emptyRegimentTemplateState,
                        [UNIT_PIKEMAN]: {
                            from: 100,
                            to: 200,
                        }
                    },
                },
            };
        },
    },
];
