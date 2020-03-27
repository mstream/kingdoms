// @flow

import { createSelector } from 'reselect';
import type { ClientState, ClientStateSelector } from '../../types';
import { clientStatePlayerSelectors } from '../../player/selectors';
import { clientStateCommonStateSelectors } from '../../common-state/selectors';
import { playerOwnsAnyCitySelector } from './player-owns-any-city';

export const isGameStartingSelector: ClientStateSelector<boolean> =
    createSelector<ClientState, void, boolean, boolean, boolean, boolean>(
        clientStatePlayerSelectors.isAuthenticated,
        clientStateCommonStateSelectors.isLoaded,
        playerOwnsAnyCitySelector,
        (isAuthenticated, isLoaded, playerOwnsAnyCity) => {
            return isLoaded && isAuthenticated && !playerOwnsAnyCity;
        },
    );