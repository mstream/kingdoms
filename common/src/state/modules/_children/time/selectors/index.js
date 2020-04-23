// @flow

import {
    timeDeltaInSecondsSelector,
} from './_impl/time-delta';
import {
    timeSelector,
} from './_impl/time';
import type {
    CommonStateSelectors,
} from '../../../types';

export const commonStateTimeSelectors: CommonStateSelectors = {
    time              : timeSelector,
    timeDeltaInSeconds: timeDeltaInSecondsSelector,
};
