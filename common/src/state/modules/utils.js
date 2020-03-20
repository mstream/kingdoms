// @flow

import type { CommonState, CommonStateReducerResult } from './types';
import { CommonStateType } from './types';

export const success = <S>({ state }: { state: S }): CommonStateReducerResult<S> => {
    return {
        state,
        errors: [],
    };
};

export const failure = <S>({ errors }: { errors: $ReadOnlyArray<string> }): CommonStateReducerResult<S> => {
    return {
        state: null,
        errors,
    };
};

export type CommonStateValidator = ({ toValidate: mixed }) => CommonState;

export const validateState: CommonStateValidator = ({ toValidate }) => {
    return CommonStateType.assert(toValidate);
};