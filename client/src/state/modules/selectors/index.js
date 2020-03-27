// @flow

import { cityIdsOwnedByPlayerSelector } from './_impl/city-ids-owned-by-player';
import { currentlyViewedCitySelector } from './_impl/currently-viewed-city';
import { isGameStartingSelector } from './_impl/is-game-starting';
import { attackingCitySelector } from './_impl/attacking-city';
import { ordersForViewedCitySelector } from './_impl/orders-for-viewed-city';
import { playerOwnsAnyCitySelector } from './_impl/player-owns-any-city';
import { nextCityIdSelector } from './_impl/next-city-id';
import { previousCityIdSelector } from './_impl/previous-city-id';
import { attackedCitySelector } from './_impl/attacked-city';
import { clientStateDistancesToAttackedCitySelector } from './_impl/distances-to-attacked-city';


export const clientStateSelectors = {
    attackedCity: attackedCitySelector,
    attackingCity: attackingCitySelector,
    cityIdsOwnedByPlayer: cityIdsOwnedByPlayerSelector,
    currentlyViewedCity: currentlyViewedCitySelector,
    distancesToAttackedCity: clientStateDistancesToAttackedCitySelector,
    isGameStarting: isGameStartingSelector,
    nextCityId: nextCityIdSelector,
    playerOwnsAnyCity: playerOwnsAnyCitySelector,
    previousCityId: previousCityIdSelector,
    ordersForViewedCity: ordersForViewedCitySelector,
};
