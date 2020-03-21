// @flow


import type {
    CommonDummyAction,
    CommonGetCurrentStateAction, CommonResetStateAction,
} from './types';
import { DUMMY, GET_CURRENT_STATE, RESET_STATE } from './types';
import type { CommonActionCreator } from '../types';

export const dummy: CommonActionCreator<CommonDummyAction> = () => {
    return {
        type: DUMMY,
        payload: undefined,
    };
};

export const getCurrentState: CommonActionCreator<CommonGetCurrentStateAction> = () => {
    return {
        type: GET_CURRENT_STATE,
        payload: undefined,
    };
};

export const resetState: CommonActionCreator<CommonResetStateAction> = () => {
    return {
        type: RESET_STATE,
        payload: undefined,
    };
};
