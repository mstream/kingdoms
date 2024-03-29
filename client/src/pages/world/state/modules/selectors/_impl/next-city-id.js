// @flow

import {
    cityIdsOwnedByPlayerSelector,
} from './city-ids-owned-by-player';
import {
    clientStateMenuSelectors,
} from '../../_children/menu/selectors';
import {
    createSelector,
} from 'reselect';
import type {
    ClientState, ClientStateSelector,
} from '../../../types';

type Selector = ClientStateSelector< ?string, void >;

export const nextCityIdSelector: Selector
    = createSelector<ClientState,
        void,
        ?string,
        ?$ReadOnlyArray< string >,
        ?string,
        >(
            cityIdsOwnedByPlayerSelector,
            clientStateMenuSelectors.currentlyViewedCityId,
            (
                citiesOwnedByPlayer, currentlyViewedCityId,
            ) => {

                if ( citiesOwnedByPlayer == null || currentlyViewedCityId == null ) {

                    return null;

                }

                if ( citiesOwnedByPlayer.length < 2 ) {

                    return null;

                }

                const sortedCityIds = [
                    ...citiesOwnedByPlayer,
                ].sort();

                const currentlyViewedCityIndex = sortedCityIds.indexOf(
                    currentlyViewedCityId,
                );
                return currentlyViewedCityIndex === citiesOwnedByPlayer.length - 1
                    ? sortedCityIds[ 0 ]
                    : sortedCityIds[ currentlyViewedCityIndex + 1 ];

            },
        );
