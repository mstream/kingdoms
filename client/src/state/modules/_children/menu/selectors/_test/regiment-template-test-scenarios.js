// @flow

import {
    UNIT_PIKEMAN,
} from '../../../../../../../../common/src/state/modules/_children/rules/reducer/types';
import {
    emptyClientState,
} from '../../../../../state';
import {
    emptyRegimentTemplateState,
} from '../../../../../../../../common/src/state/modules/_children/orders/reducer/state';
import type {
    ClientStateSelectorTestScenario,
} from '../../../../../types';
import type {
    CommonStateRegimentTemplate,
} from '../../../../../../../../common/src/state/modules/_children/orders/reducer/types';

type Scenarios = $ReadOnlyArray< ClientStateSelectorTestScenario< CommonStateRegimentTemplate >, >;

export const regimentTemplateSelectorTestScenarios: Scenarios = [
    {
        expectedValue: {
            ...emptyRegimentTemplateState,
            [ UNIT_PIKEMAN ]: {
                from: 100,
                to  : 200,
            },
        },
        name : `returns the regiment template`,
        state: {
            ...emptyClientState,
            menu: {
                ...emptyClientState.menu,
                attackView: {
                    ...emptyClientState.menu.attackView,
                    regimentTemplate: {
                        ...emptyRegimentTemplateState,
                        [ UNIT_PIKEMAN ]: {
                            from: 100,
                            to  : 200,
                        },
                    },
                },
            },
        },
    },
];
