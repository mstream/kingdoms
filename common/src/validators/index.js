// @flow

import type { CommonStateTime } from '../state/modules/time/reducer/types';
import type { CommonExecuteTimeStepAction } from '../state/modules/time/actions';

export const validateCityName = ({ name }: { name: string }): $ReadOnlyArray<string> => {
    if (name.length < 3) {
        return [`the city name is too short`];
    }
    if (name.length > 20) {
        return [`the city name is too long`];
    }
    if (name.match(/^[A-Z][a-z]+$/) == null) {
        return [`the city name does not follow the convention`];
    }
    return [];
};
