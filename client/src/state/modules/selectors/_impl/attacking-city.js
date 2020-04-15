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
} from '../../../../../../common/src/state/modules/cities/reducer/types';

export const attackingCitySelector: ClientStateSelector< ?CommonStateCity > = createSelector<ClientState,
    void,
    ?CommonStateCity,
    ?string,
    ?CommonStateCities,
    >(
        clientStateMenuSelectors.attackingCityId,
        clientStateCommonStateSelectors.cities,
        (
            attackingCityId, cities,
        ) => {

            if ( attackingCityId == null || cities == null ) {

                return null;

            }

            return cities[ attackingCityId ];

        },
    );
