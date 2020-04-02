// @flow

import type { CommonStateSelectorTestScenario } from '../../../types';
import { emptyCommonState } from '../../../state';
import type { CommonStateTime } from '../../reducer/types';

type Scenarios = $ReadOnlyArray<
    CommonStateSelectorTestScenario<CommonStateTime>,
>;

export const timeSelectorTestScenarios: Scenarios = [
    {
        name: 'returns orders',
        state: {
            ...emptyCommonState,
            time: '2000-01-01T00:00:00Z',
        },
        expectedValue: '2000-01-01T00:00:00Z',
    },
];
