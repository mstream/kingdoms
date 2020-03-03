// @flow


import {resetStateCitiesByOwnerReducer} from './reset-state';
import {abandonCityCitiesByOwnerReducer} from './abandon-city';
import type {ServerStateReducer} from '../root';
import type {
    CommonStateCitiesByOwner,
    ServerState
} from '../../../../../common/src/state';
import {unsupportedActionCitiesByOwnerReducer} from './unsupported';
import type {ServerAction} from '../../../../../common/src/actions';
import {createCityCitiesByOwnerReducer} from './create-city';

export const citiesByOwnerReducer: ServerStateReducer<CommonStateCitiesByOwner> = ({action, state}: { action: ServerAction, state: ServerState }) => {
    switch (action.type) {
        case 'ABANDON_CITY': {
            return abandonCityCitiesByOwnerReducer({action, state});
        }
        case 'CREATE_CITY': {
            return createCityCitiesByOwnerReducer({action, state});
        }
        case 'RESET_STATE': {
            return resetStateCitiesByOwnerReducer({action, state});
        }
        default: {
            return unsupportedActionCitiesByOwnerReducer({action, state});
        }
    }
};
