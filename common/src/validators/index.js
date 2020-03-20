// @flow

import type { CommonState } from '../state/modules/types';
import { CommonStateType } from '../state/modules/types';
import { CommonStateUnitKeyType } from '../state/modules/rules/reducer/types';
import type { TypeValidator } from './types';
import type { CommonStateUnitKey } from '../state/modules/rules/reducer/types';

export const validateCommonStateType: TypeValidator<CommonState> = ({ toValidate }) => {
    return CommonStateType.assert(toValidate);
};

export const validateUnitType: TypeValidator<CommonStateUnitKey> = ({ toValidate }) => {
    return CommonStateUnitKeyType.assert(toValidate);
};

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
