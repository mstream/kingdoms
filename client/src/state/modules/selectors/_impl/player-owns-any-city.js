// @flow

import { createSelector } from 'reselect';
import { cityIdsOwnedByPlayerSelector } from './city-ids-owned-by-player';
import type { ClientState, ClientStateSelector } from '../../../types';

export const playerOwnsAnyCitySelector: ClientStateSelector<boolean> = createSelector<
    ClientState,
    void,
    boolean,
    ?$ReadOnlyArray<string>,
    ?string,
>(cityIdsOwnedByPlayerSelector, (cityIdsOwnedByPlayer) => {
    return cityIdsOwnedByPlayer != null && cityIdsOwnedByPlayer.length > 0;
});
