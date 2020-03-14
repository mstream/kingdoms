// @flow

import type { ClientAction } from '../../../actions';
import { unsupportedActionReducer } from '../../unsupported-action-reducer';
import { updateStateMenuReducer } from './update-state';
import { closeCityViewMenuReducer } from './close-city-view';
import { openCityViewMenuReducer } from './open-city-view';
import { requestCityCreationMenuReducer } from './request-city-creation';
import { selectCityViewTabMenuReducer } from './select-city-view-tab';
import { selectCityViewUnitTabMenuReducer } from './select-city-view-unit';
import { closeAttackViewMenuReducer } from './close-attack-view';
import { openAttackViewMenuReducer } from './open-attack-view';
import type { ClientStateMenu } from './types';
import { TAB_OVERVIEW } from './types';
import { UNIT_PEASANT } from '../../../../../../common/src/state';
import type { ClientState } from '../../root';
import {
    CLOSE_ATTACK_VIEW,
    CLOSE_CITY_VIEW,
    OPEN_ATTACK_VIEW,
    OPEN_CITY_VIEW,
    SELECT_CITY_VIEW_TAB,
    SELECT_CITY_VIEW_UNIT_TAB,
} from '../actions';
import {
    REQUEST_CITY_CREATION,
    UPDATE_STATE,
} from '../../common-state/actions';

export const initialMenuState = {
    attackView: {
        attackedCityId: null,
        attackingCityId: null,
        regimentTemplate: {},
    },
    cityView: {
        currentCityId: null,
        tab: TAB_OVERVIEW,
        unit: UNIT_PEASANT,
    },
    newCity: {
        isCityBeingCreated: false,
    },
};

export const menuReducer = (
    localState: ClientStateMenu = initialMenuState,
    action: ClientAction,
    globalState: ClientState,
): ClientStateMenu => {
    switch (action.type) {
        case CLOSE_ATTACK_VIEW: {
            return closeAttackViewMenuReducer({
                action,
                localState,
                globalState,
            });
        }
        case CLOSE_CITY_VIEW: {
            return closeCityViewMenuReducer({
                action,
                localState,
                globalState,
            });
        }
        case OPEN_ATTACK_VIEW: {
            return openAttackViewMenuReducer({
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
        case SELECT_CITY_VIEW_TAB: {
            return selectCityViewTabMenuReducer({
                action,
                localState,
                globalState,
            });
        }
        case SELECT_CITY_VIEW_UNIT_TAB: {
            return selectCityViewUnitTabMenuReducer({
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
