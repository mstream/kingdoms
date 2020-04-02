// @flow

import { createSelector } from 'reselect';
import { cityIdsOwnedByPlayerSelector } from './city-ids-owned-by-player';
import type { ClientState } from '../../../types';
import { clientStateMenuSelectors } from '../../_children/menu/selectors';

export const previousCityIdSelector = createSelector<
    ClientState,
    void,
    ?string,
    ?$ReadOnlyArray<string>,
    ?string,
>(
    cityIdsOwnedByPlayerSelector,
    clientStateMenuSelectors.currentlyViewedCityId,
    (citiesOwnedByPlayer, currentlyViewedCity) => {
        if (citiesOwnedByPlayer == null || currentlyViewedCity == null) {
            return null;
        }

        if (citiesOwnedByPlayer.length < 2) {
            return null;
        }

        const sortedCityIds = [...citiesOwnedByPlayer].sort();
        const currentlyViewedCityIndex = sortedCityIds.indexOf(
            currentlyViewedCity,
        );
        return currentlyViewedCityIndex === 0
            ? sortedCityIds[citiesOwnedByPlayer.length - 1]
            : sortedCityIds[currentlyViewedCityIndex - 1];
    },
);
