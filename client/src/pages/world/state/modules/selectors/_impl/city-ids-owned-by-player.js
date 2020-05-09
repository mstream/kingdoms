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
import type {
    CityIdsByOwner,
} from '../../../../../../../../common/src/state/modules/_children/cities/selectors/types';
import type {
    ClientState, ClientStateSelector,
} from '../../../types';

type Selector = ClientStateSelector< ?$ReadOnlyArray< string >, void >;

export const cityIdsOwnedByPlayerSelector: Selector
    = createSelector<ClientState,
        void,
        ?$ReadOnlyArray< string >,
        ?CityIdsByOwner,
        ?string,
        >(
            clientStateCommonStateSelectors.cityIdsByOwner,
            clientStatePlayerSelectors.name,
            (
                cityIdsByOwner, playerName,
            ) => {

                if ( cityIdsByOwner == null || playerName == null ) {

                    return null;

                }

                const playerCityIds = cityIdsByOwner[ playerName ];

                return playerCityIds == null
                    ? []
                    : playerCityIds;

            },
        );
