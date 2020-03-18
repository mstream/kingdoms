// @flow

import type { CommonStateReducerResult } from './types';

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
