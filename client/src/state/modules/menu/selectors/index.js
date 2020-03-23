// @flow

import type { ClientStateMenu } from '../reducer/types';
import type { ClientState } from '../../types';
import type { CommonStateRegimentTemplate } from '../../../../../../common/src/state/modules/orders/reducer/types';
import { createSelector } from 'reselect';
import { commonStateMinimumRegimentSizeSelector } from '../../../../../../common/src/state/modules/orders/selectors';

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

export const regimentTemplateSelector = (state: ClientState): CommonStateRegimentTemplate => {
    return state.menu.attackView.regimentTemplate;
};

export const minimumRegimentSizeSelector = createSelector<ClientState, void, number, CommonStateRegimentTemplate>(
    regimentTemplateSelector,
    (regimentTemplate) => {
        return commonStateMinimumRegimentSizeSelector(regimentTemplate);
    },
);
