// @flow

import { cityIdsOwnedByPlayerSelector } from './_impl/city-ids-owned-by-player';
import { currentlyViewedCitySelector } from './_impl/currently-viewed-city';
import { isGameStartingSelector } from './_impl/is-game-starting';
import { attackingCitySelector } from './_impl/attacking-city';
import { scheduledAttackOrdersForViewedCitySelector } from './_impl/scheduled-attack-orders-for-viewed-city';
import { playerOwnsAnyCitySelector } from './_impl/player-owns-any-city';
import { nextCityIdSelector } from './_impl/next-city-id';
import { previousCityIdSelector } from './_impl/previous-city-id';
import { attackedCitySelector } from './_impl/attacked-city';
import { clientStateDistancesToAttackedCitySelector } from './_impl/distances-to-attacked-city';
import { clientStateCameraSelectors } from '../_children/camera/selectors';
import { clientStateErrorsSelectors } from '../_children/errors/selectors';
import { clientStateCommonStateSelectors } from '../_children/common-state/selectors';
import { clientStateMenuSelectors } from '../_children/menu/selectors';
import { clientStatePlayerSelectors } from '../_children/player/selectors';
import { clientStateTilesSelectors } from '../_children/tiles/selectors';


export const clientStateSelectors = {
    camera: clientStateCameraSelectors,
    commonState: clientStateCommonStateSelectors,
    errors: clientStateErrorsSelectors,
    menu: clientStateMenuSelectors,
    player: clientStatePlayerSelectors,
    tiles: clientStateTilesSelectors,
    attackedCity: attackedCitySelector,
    attackingCity: attackingCitySelector,
    cityIdsOwnedByPlayer: cityIdsOwnedByPlayerSelector,
    currentlyViewedCity: currentlyViewedCitySelector,
    distancesToAttackedCity: clientStateDistancesToAttackedCitySelector,
    isGameStarting: isGameStartingSelector,
    nextCityId: nextCityIdSelector,
    playerOwnsAnyCity: playerOwnsAnyCitySelector,
    previousCityId: previousCityIdSelector,
    scheduledAttackOrdersForViewedCity: scheduledAttackOrdersForViewedCitySelector,
};
