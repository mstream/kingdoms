// @flow

import {
    emptyClientState,
} from '../../../../../state';
import {
    emptyCommonState,
} from '../../../../../../../../common/src/state/modules/state';
import type {
    ClientStateCommonState,
} from '../../reducer/types';
import type {
    ClientStateSelectorTestScenario,
} from '../../../../../types';

type Scenarios = $ReadOnlyArray< ClientStateSelectorTestScenario< ClientStateCommonState >, >;

export const commonStateSelectorTestScenarios: Scenarios = [
    {
        expectedValue: null,
        name         : `returns null when common state is absent`,
        state        : {
            ...emptyClientState,
            commonState: null,
        },
    },
    {
        expectedValue: emptyCommonState,
        name         : `returns common state when common state is present`,
        state        : {
            ...emptyClientState,
            commonState: emptyCommonState,
            player     : {
                name: null,
            },
        },
    },
];
