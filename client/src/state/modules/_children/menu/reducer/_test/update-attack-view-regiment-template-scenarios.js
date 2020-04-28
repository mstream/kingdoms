// @flow

import {
    UNIT_ARCHER,
    UNIT_PIKEMAN,
} from '../../../../../../../../common/src/state/modules/_children/rules/reducer/types';
import {
    clientActions,
} from '../../../../actions';
import {
    emptyClientState,
} from '../../../../../state';
import {
    emptyRegimentTemplateState,
} from '../../../../../../../../common/src/state/modules/_children/orders/reducer/state';
import type {
    ClientStateMenuReducerTestScenario,
} from './types';
import type {
    ClientUpdateAttackViewRegimentTemplateAction,
} from '../../actions/types';

type Scenario =
    ClientStateMenuReducerTestScenario< ClientUpdateAttackViewRegimentTemplateAction >;

type Scenarios = $ReadOnlyArray< Scenario >;

export const updateAttackViewRegimentTemplateScenarios: Scenarios = [
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
