// @flow

import {
    clientStateCommonStateSelectors,
} from '../../_children/common-state/selectors';
import {
    clientStatePlayerSelectors,
} from '../../_children/player/selectors';
import {
    createSelector,
} from 'reselect';
import {
    playerOwnsAnyCitySelector,
} from './player-owns-any-city';
import type {
    ClientState, ClientStateSelector,
} from '../../../types';

export const isGameStartingSelector: ClientStateSelector< boolean, void > = createSelector<ClientState,
    void,
    boolean,
    boolean,
    boolean,
    boolean,
    >(
        clientStatePlayerSelectors.isAuthenticated,
        clientStateCommonStateSelectors.isLoaded,
        playerOwnsAnyCitySelector,
        (
            isAuthenticated, isLoaded, playerOwnsAnyCity,
        ) => {

            return isLoaded && isAuthenticated && !playerOwnsAnyCity;

        },
    );
