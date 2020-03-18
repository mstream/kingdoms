// @flow

import type {
    CommonState,
    CommonStateReducerResult,
} from './types';
import { success } from './utils';
import type { CommonAction } from '../actions/types';

export const unsupportedActionReducer = <S, A: CommonAction>(
    {
        localState,
        action,
        globalState,
    }: {
        localState: S,
        action: A,
        globalState: CommonState,
    },
): CommonStateReducerResult<S> => {
    return success({ state: localState });
};
