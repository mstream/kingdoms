// @flow

import {
    UNIT_ARCHER,
    UNIT_PIKEMAN,
} from '../../../../../../../../common/src/state/modules/rules/reducer/types';
import type {
    ClientStateMenuReducerTestScenario,
} from './types';
import type {
    ClientUpdateAttackViewRegimentTemplateAction,
} from '../../actions/types';
import {
    emptyRegimentTemplateState,
} from '../../../../../../../../common/src/state/modules/orders/reducer/state';
import {
    emptyClientState,
} from '../../../../../state';
import {
    clientActions,
} from '../../../../actions';

type Scenarios = $ReadOnlyArray< ClientStateMenuReducerTestScenario< ClientUpdateAttackViewRegimentTemplateAction >, >;

export const updateAttackViewRegimentTemplateTestScenarios: Scenarios  = [
    {
        action: clientActions.menu.updateAttackViewRegimentTemplate(
            {
                regimentTemplate: {
                    ...emptyRegimentTemplateState,
                    [ UNIT_PIKEMAN ]: {
                        from: 100,
                        to  : 200,
                    },
                },
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
                    regimentTemplate: {
                        ...emptyRegimentTemplateState,
                        [ UNIT_PIKEMAN ]: {
                            from: 100,
                            to  : 200,
                        },
                    },
                },
            };

        },
        name               : `updates the regiment template`,
        previousGlobalState: {
            ...emptyClientState,
            menu: {
                ...emptyClientState.menu,
                attackView: {
                    ...emptyClientState.menu.attackView,
                    regimentTemplate: {
                        ...emptyRegimentTemplateState,
                        [ UNIT_ARCHER ]: {
                            from: 50,
                            to  : 100,
                        },
                    },
                },
            },
        },
    },
];
