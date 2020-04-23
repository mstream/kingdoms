// @flow

import {
    cityIdsOwnedByPlayerSelector,
} from './city-ids-owned-by-player';
import {
    createSelector,
} from 'reselect';
import type {
    ClientState, ClientStateSelector,
} from '../../../types';

export const playerOwnsAnyCitySelector: ClientStateSelector< boolean, void > = createSelector<ClientState,
    void,
    boolean,
    ?$ReadOnlyArray< string >,
    ?string,
    >(
        cityIdsOwnedByPlayerSelector,
        (
            cityIdsOwnedByPlayer,
        ) => {

            return cityIdsOwnedByPlayer != null && cityIdsOwnedByPlayer.length > 0;

        },
    );
