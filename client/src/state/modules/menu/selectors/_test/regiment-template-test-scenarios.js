// @flow

import type { ClientStateSelectorTestScenario } from '../../../types';
import { emptyClientState } from '../../../state';
import { emptyRegimentTemplateState } from '../../../../../../../common/src/state/modules/orders/reducer/state';
import { UNIT_PIKEMAN } from '../../../../../../../common/src/state/modules/rules/reducer/types';
import type { CommonStateRegimentTemplate } from '../../../../../../../common/src/state/modules/orders/reducer/types';

type Scenarios = $ReadOnlyArray<ClientStateSelectorTestScenario<CommonStateRegimentTemplate>>

export const regimentTemplateSelectorTestScenarios: Scenarios = [
    {
        name: 'returns the regiment template',
        state: {
            ...emptyClientState,
            menu: {
                ...emptyClientState.menu,
                attackView: {
                    ...emptyClientState.menu.attackView,
                    regimentTemplate: {
                        ...emptyRegimentTemplateState,
                        [UNIT_PIKEMAN]: {
                            from: 100,
                            to: 200,
                        },
                    },
                },
            },
        },
        expectedValue: {
            ...emptyRegimentTemplateState,
            [UNIT_PIKEMAN]: {
                from: 100,
                to: 200,
            },
        },
    },
];
