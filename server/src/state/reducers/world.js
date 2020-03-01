// @flow

import type {CommonStateWorld} from '../../../../common/src/state';
import type {ServerStateReducer} from './root';
import {success} from './root';
import {initialState} from '../state';

export const worldReducer: ServerStateReducer<CommonStateWorld> = ({action, state}) => {
    switch (action.type) {
        case 'RESET_STATE': {
            return success({state: initialState.world});
        }
        default: {
            return success({state: state.world});
        }
    }
};

