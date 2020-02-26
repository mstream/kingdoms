/**
 * @flow
 */

import type {CommonStateWorldSize} from '../../../../common/src/state';
import type {ServerStateReducer} from './root';
import {success} from './root';
import {initialState} from '../state';

export const worldSizeReducer: ServerStateReducer<CommonStateWorldSize> = ({action, state}) => {
    switch (action.type) {
        case 'RESET_STATE': {
            return success({state: initialState.worldSize});
        }
        default: {
            return success({state: state.worldSize});
        }
    }
};

