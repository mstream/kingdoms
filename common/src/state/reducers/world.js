// @flow

import type {CommonStateWorld} from '../../../../common/src/state';
import type {CommonstateReducer} from './root';
import {success} from './root';
import {initialCommonstate} from '../state';

export const worldReducer: CommonstateReducer<CommonStateWorld> = ({action, state}) => {
    switch (action.type) {
        case 'RESET_STATE': {
            return success({state: initialCommonstate.world});
        }
        default: {
            return success({state: state.world});
        }
    }
};

