/**
 * @flow
 */
import type {Reducer} from 'redux';
import type {ClientAction} from '../../actions';
import type {ClientState} from './root';

export const globalReducer: Reducer<?ClientState, ClientAction> = (state, action) => {
    if (state == null) {
        return state;
    }
    switch (action.type) {
        case 'NAVIGATED_TO_NEXT_CITY': {
            const playerId = '1';
            const cityIds = state.cities.byOwnerId[playerId];
            if (cityIds == null) {
                console.error(`no cities owned by player ${playerId}`);
                return;
            }
            if (cityIds.length < 2) {
                return state;
            }
            const currentCityIndex = cityIds.findIndex(cityId => {
                return cityId === action.payload;
            });
            if (currentCityIndex === -1) {
                console.error(`city ${action.payload} does not belong to the player`);
                return state;
            }
            const nextCityId = currentCityIndex === cityIds.length - 1 ? cityIds[0] : cityIds[currentCityIndex + 1];
            return {
                ...state,
                menu: {
                    viewedCityId: nextCityId
                }
            };
        }
        case 'NAVIGATED_TO_PREVIOUS_CITY': {
            const playerId = '1';
            const cityIds = state.cities.byOwnerId[playerId];
            if (cityIds == null) {
                console.error(`no cities owned by player ${playerId}`);
                return;
            }
            if (cityIds.length < 2) {
                return state;
            }
            const currentCityIndex = cityIds.findIndex(cityId => {
                return cityId === action.payload;
            });
            if (currentCityIndex === -1) {
                console.error(`city ${action.payload} does not belong to the player`);
                return state;
            }
            const nextCityId = currentCityIndex === 0 ? cityIds[cityIds.length - 1] : cityIds[currentCityIndex - 1];
            return {
                ...state,
                menu: {
                    viewedCityId: nextCityId
                }
            };
        }
        default: {
            return state;
        }
    }
};



