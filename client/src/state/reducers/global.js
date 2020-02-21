/**
 * @flow
 */
import type { Reducer } from 'redux';
import type { ClientAction } from '../actions';
import type { ClientState } from './root';

export const globalReducer: Reducer<ClientState, ClientAction> = (
    state,
    action: ClientAction
) => {
    if (state == null) {
        return state;
    }
    switch (action.type) {
        case 'NAVIGATE_TO_NEXT_CITY': {
            if (state == null) {
                return state;
            }
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
                return cityId === state.menu.viewedCityId;
            });
            if (currentCityIndex === -1) {
                return state;
            }
            const nextCityId =
                currentCityIndex === cityIds.length - 1
                    ? cityIds[0]
                    : cityIds[currentCityIndex + 1];
            return {
                ...state,
                menu: {
                    viewedCityId: nextCityId,
                },
            };
        }
        case 'NAVIGATE_TO_PREVIOUS_CITY': {
            if (state == null) {
                return state;
            }
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
                return cityId === state.menu.viewedCityId;
            });
            if (currentCityIndex === -1) {
                return state;
            }
            const nextCityId =
                currentCityIndex === 0
                    ? cityIds[cityIds.length - 1]
                    : cityIds[currentCityIndex - 1];
            return {
                ...state,
                menu: {
                    viewedCityId: nextCityId,
                },
            };
        }
        default: {
            return state;
        }
    }
};
