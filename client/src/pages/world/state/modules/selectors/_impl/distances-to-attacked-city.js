// @flow

import {
    clientStateCommonStateSelectors,
} from '../../_children/common-state/selectors';
import {
    clientStateMenuSelectors,
} from '../../_children/menu/selectors';
import {
    createSelector,
} from 'reselect';
import type {
    CitiesDistances,
    CityDistances,
} from '../../../../../../../../common/src/state/modules/_children/cities/selectors/types';
import type {
    ClientState, ClientStateSelector,
} from '../../../types';

type Selector = ClientStateSelector< ?CityDistances, void >;

export const clientStateDistancesToAttackedCitySelector: Selector
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
