// @flow

import type { ClientState, ClientStateMenu } from '../../state';
import { initialClientState } from '../../state';
import type { ClientAction } from '../../actions';
import {
    CLOSE_CITY_VIEW,
    OPEN_CITY_VIEW,
    REQUEST_CITY_CREATION,
    UPDATE_STATE,
} from '../../actions';
import { unsupportedActionReducer } from '../unsupported-action-reducer';
import { updateStateMenuReducer } from './update-state';
import { closeCityViewMenuReducer } from './close-city-view';
import { openCityViewMenuReducer } from './open-city-view';
import { requestCityCreationMenuReducer } from './request-city-creation';

export const menuReducer = (
    localState: ClientStateMenu = initialClientState.menu,
    action: ClientAction,
    globalState: ClientState,
): ClientStateMenu => {
    switch (action.type) {
        case CLOSE_CITY_VIEW: {
            return closeCityViewMenuReducer({
                action,
                localState,
                globalState,
            });
        }
        case OPEN_CITY_VIEW: {
            return openCityViewMenuReducer({
                action,
                localState,
                globalState,
            });
        }
        case REQUEST_CITY_CREATION: {
            return requestCityCreationMenuReducer({
                action,
                localState,
                globalState,
            });
        }
        case UPDATE_STATE: {
            return updateStateMenuReducer({ action, localState, globalState });
        }
        default: {
            return unsupportedActionReducer({
                action,
                localState,
                globalState,
            });
        }
    }
};
