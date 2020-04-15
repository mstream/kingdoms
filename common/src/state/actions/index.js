// @flow

import {
    DUMMY, GET_CURRENT_STATE, RESET_STATE,
} from './types';
import type {
    CommonActionCreator,
} from '../types';
import type {
    CommonDummyAction,
    CommonGetCurrentStateAction,
    CommonResetStateAction,
} from './types';

export const dummy: CommonActionCreator< CommonDummyAction > = () => {

    return {
        payload: undefined,
        type   : DUMMY,
    };

};

export const getCurrentState: CommonActionCreator< CommonGetCurrentStateAction > = (
    payload,
) => {

    return {
        payload,
        type: GET_CURRENT_STATE,
    };

};

export const resetState: CommonActionCreator< CommonResetStateAction > = () => {

    return {
        payload: undefined,
        type   : RESET_STATE,
    };

};
