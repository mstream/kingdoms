// @flow

import type {CommonStateWorld} from '../../../../common/src/state';
import type {ServerStateReducer} from './root';
import {success} from './root';
import {initialServerState} from '../state';

export const worldReducer: ServerStateReducer<CommonStateWorld> = ({action, state}) => {
    switch (action.type) {
        case 'RESET_STATE': {
            return success({state: initialServerState.world});
        }
        default: {
            return success({state: state.world});
        }
    }
};

