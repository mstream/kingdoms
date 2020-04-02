// @flow

import { emptyClientState } from '../../../../../state';
import type { ClientStateErrors } from '../../reducer/types';
import type { ClientStateSelectorTestScenario } from '../../../../../types';

type Scenarios = $ReadOnlyArray<
    ClientStateSelectorTestScenario<ClientStateErrors>,
>;

export const errorsSelectorTestScenarios: Scenarios = [
    {
        name: 'returns errors state',
        state: {
            ...emptyClientState,
            errors: ['error1', 'error2'],
        },
        expectedValue: ['error1', 'error2'],
    },
];
