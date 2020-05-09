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
    ClientState, ClientStateSelector,
} from '../../../types';
import type {
    CommonStateCities,
    CommonStateCity,
} from '../../../../../../../../common/src/state/modules/_children/cities/reducer/types';

type Selector = ClientStateSelector< ?CommonStateCity, void >;

export const currentlyViewedCitySelector: Selector
    = createSelector<ClientState,
        void,
        ?CommonStateCity,
        ?CommonStateCities,
        ?string,
        >(
            clientStateCommonStateSelectors.cities,
            clientStateMenuSelectors.currentlyViewedCityId,
            (
                cities, currentlyViewedCityId,
            ) => {

                if ( cities == null || currentlyViewedCityId == null ) {

                    return null;

                }

                return cities[ currentlyViewedCityId ];

            },
        );
