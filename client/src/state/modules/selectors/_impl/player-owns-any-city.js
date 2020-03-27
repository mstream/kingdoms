// @flow

import { createSelector } from 'reselect';
import type { ClientState, ClientStateSelector } from '../../types';
import { cityIdsOwnedByPlayerSelector } from './city-ids-owned-by-player';


export const playerOwnsAnyCitySelector: ClientStateSelector<boolean> =
    createSelector<ClientState, void, boolean, ?$ReadOnlyArray<string>, ?string>(
        cityIdsOwnedByPlayerSelector,
        (cityIdsOwnedByPlayer) => {
            return cityIdsOwnedByPlayer != null && cityIdsOwnedByPlayer.length > 0;
        },
    );
