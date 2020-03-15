// @flow

import type { ClientState } from '../../root';
import type { ClientStateMenu } from '../reducer/types';

export const menuSelector = (state: ClientState): ClientStateMenu => {
    return state.menu;
};

export const isCityBeingCreatedSelector = (state: ClientState): boolean => {
    return state.menu.newCity.isCityBeingCreated;
};

export const currentlyViewedCityIdSelector = (state: ClientState): ?string => {
    return state.menu.cityView.currentCityId;
};

export const attackedCityIdSelector = (state: ClientState): ?string => {
    return state.menu.attackView.attackedCityId;
};

export const attackingCityIdSelector = (state: ClientState): ?string => {
    return state.menu.attackView.attackingCityId;
};