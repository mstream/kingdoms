// @flow

import type {CommonStateReducer} from './root';
import {success} from './root';
import {initialCommonState} from '../state';
import type { CommonStateWorld } from '../state';

export const worldReducer: CommonStateReducer<CommonStateWorld> = ({action, state}) => {
    switch (action.type) {
        case 'RESET_STATE': {
            return success({state: initialCommonState.world});
        }
        default: {
            return success({state: state.world});
        }
    }
};

