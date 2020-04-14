// @flow

import {
    createSelector,
} from 'reselect';
import {
    clientStateMenuSelectors,
} from '../../_children/menu/selectors';
import {
    clientStateCommonStateSelectors,
} from '../../_children/common-state/selectors';
import type {
    CitiesDistances,
    CityDistances,
} from '../../../../../../common/src/state/modules/cities/selectors/types';
import type {
    ClientState, ClientStateSelector,
} from '../../../types';

export const clientStateDistancesToAttackedCitySelector: ClientStateSelector< ?CityDistances >
    = createSelector<ClientState,
        void,
        ?CityDistances,
        ?string,
        ?CitiesDistances,
        >(
            clientStateMenuSelectors.attackedCityId,
            clientStateCommonStateSelectors.citiesDistances,
            (
                attackedCityId, citiesDistances,
            ) => {

                if ( attackedCityId == null || citiesDistances == null ) {

                    return null;

                }

                return citiesDistances[ attackedCityId ];

            },
        );
