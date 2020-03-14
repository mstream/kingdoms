// @flow

import { createSelector } from 'reselect';
import {
    commonStateCitiesSelector,
    commonStateCityIdsByOwnerSelector,
    commonStateRulesSelector,
    commonStateWorldSelector,
} from '../../../../common/src/selectors/common-state';
import type {
    CommonStateCities, CommonStateCity,
    CommonStateRules,
    CommonStateUnits,
    CommonStateUnitStats,
    CommonStateWorld,
} from '../../../../common/src/state';
import type {
    ClientStateCityViewTab,
    ClientStateMenu,
} from '../modules/menu/reducer/types';
import type { ClientState } from '../modules/root';
import { commonStateSelector } from '../modules/common-state/selectors';
import type { ClientStateCommonState } from '../modules/common-state/reducer/types';
import { playerNameSelector } from '../modules/player/selectors';
import {
    attackedCityIdSelector,
    currentlyViewedCityIdSelector,
    menuSelector,
} from '../modules/menu/selectors';

export const citiesSelector = createSelector<ClientState, void, CommonStateCities, ClientStateCommonState>(
    commonStateSelector,
    (commonState) => {
        if (commonState == null) {
            return Object.freeze({});
        }
        return commonStateCitiesSelector(commonState);
    },
);

export const rulesSelector = createSelector<ClientState, void, ?CommonStateRules, ClientStateCommonState>(
    commonStateSelector,
    (commonState) => {
        if (commonState == null) {
            return null;
        }
        return commonStateRulesSelector(commonState);
    },
);

export const unitStatsSelector = createSelector<ClientState, void, ?CommonStateUnitStats, ?CommonStateRules>(
    rulesSelector,
    (rules) => {
        if (rules == null) {
            return null;
        }
        return rules.unitStats;
    },
);

export const worldSelector = createSelector<ClientState, void, ?CommonStateWorld, ?ClientStateCommonState>(
    commonStateSelector,
    (commonState) => {
        if (commonState == null) {
            return null;
        }
        return commonStateWorldSelector(commonState);
    },
);

export const cityIdsByOwnerSelector = createSelector<ClientState, void, { [string]: $ReadOnlyArray<string> }, ClientStateCommonState>(
    commonStateSelector,
    (commonState) => {
        if (commonState == null) {
            return Object.freeze({});
        }
        return commonStateCityIdsByOwnerSelector(commonState);
    },
);

export const currentlyViewedCitySelector = createSelector<ClientState, void, ?CommonStateCity, CommonStateCities, ?string>(
    citiesSelector,
    currentlyViewedCityIdSelector,
    (cities, currentlyViewedCityId) => {
        if (cities == null || currentlyViewedCityId == null) {
            return null;
        }

        return cities[currentlyViewedCityId];
    },
);

export const isCityViewOpenSelector = createSelector<ClientState, void, boolean, ?string>(
    currentlyViewedCityIdSelector,
    (currentlyViewedCityId) => {
        return currentlyViewedCityId != null;
    },
);

export const isAttackViewOpenSelector = createSelector<ClientState, void, boolean, ?string>(
    attackedCityIdSelector,
    (attackedCityId) => {
        return attackedCityId != null;
    },
);

export const isAnyMenuOpen = createSelector<ClientState, void, boolean, boolean, boolean>(
    isAttackViewOpenSelector,
    isCityViewOpenSelector,
    (isAttackViewOpen, cityViewOpenSelector) => {
        return isAttackViewOpen || cityViewOpenSelector;
    },
);

export const attackedCitySelector = createSelector<ClientState, void, ?CommonStateCity, CommonStateCities, ?string>(
    citiesSelector,
    attackedCityIdSelector,
    (cities, attackedCityId) => {
        if (cities == null || attackedCityId == null) {
            return null;
        }

        return cities[attackedCityId];
    },
);

export const activeCityTabSelector = createSelector<ClientState, void, ClientStateCityViewTab, ClientStateMenu>(
    menuSelector,
    (menu) => {
        return menu.cityView.tab;
    },
);

export const activeUnitSelector = createSelector<ClientState, void, $Keys<CommonStateUnits>, ClientStateMenu>(
    menuSelector,
    (menu) => {
        return menu.cityView.unit;
    },
);

export const cityIdsOwnedByPlayerSelector = createSelector<ClientState, void, $ReadOnlyArray<string>, { [string]: $ReadOnlyArray<string> }, ?string>(
    cityIdsByOwnerSelector,
    playerNameSelector,
    (cityIdsByOwner, playerName) => {
        if (playerName == null) {
            return [];
        }

        const playerCityIds = cityIdsByOwner[playerName];

        return playerCityIds == null ? [] : playerCityIds;
    },
);

export const isGameStartingSelector = createSelector<ClientState, void, boolean, $ReadOnlyArray<string>, ?string, ClientStateCommonState>(
    cityIdsOwnedByPlayerSelector,
    playerNameSelector,
    commonStateSelector,
    (citiesOwnedByPlayer, playerName, commonState) => {
        return commonState != null && playerName != null && citiesOwnedByPlayer.length === 0;
    },
);

export const nextCityIdSelector = createSelector<ClientState, void, ?string, $ReadOnlyArray<string>, ?string>(
    cityIdsOwnedByPlayerSelector,
    currentlyViewedCityIdSelector,
    (citiesOwnedByPlayer, currentlyViewedCity) => {
        if (currentlyViewedCity == null) {
            return null;
        }

        if (citiesOwnedByPlayer.length < 2) {
            return null;
        }

        const sortedCityIds = [...citiesOwnedByPlayer].sort();
        const currentlyViewedCityIndex = sortedCityIds.indexOf(currentlyViewedCity);
        return currentlyViewedCityIndex === 0 ? sortedCityIds[citiesOwnedByPlayer.length - 1] : sortedCityIds[currentlyViewedCityIndex - 1];
    },
);

export const previousCityIdSelector = createSelector<ClientState, void, ?string, $ReadOnlyArray<string>, ?string>(
    cityIdsOwnedByPlayerSelector,
    currentlyViewedCityIdSelector,
    (citiesOwnedByPlayer, currentlyViewedCity) => {
        if (currentlyViewedCity == null) {
            return null;
        }

        if (citiesOwnedByPlayer.length < 2) {
            return null;
        }

        const sortedCityIds = [...citiesOwnedByPlayer].sort();
        const currentlyViewedCityIndex = sortedCityIds.indexOf(currentlyViewedCity);
        return currentlyViewedCityIndex === citiesOwnedByPlayer.length - 1 ? sortedCityIds[0] : sortedCityIds[currentlyViewedCityIndex + 1];
    },
);
