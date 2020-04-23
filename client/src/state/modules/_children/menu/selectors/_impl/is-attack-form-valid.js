// @flow

import {
    attackingCityIdSelector,
} from './attacking-city-id';
import {
    calculateStateMinimumRegimentSize,
} from '../../../../../../../../common/src/state/modules/_children/orders/utils';
import {
    createSelector,
} from 'reselect';
import {
    regimentTemplateSelector,
} from './regiment-template';
import type {
    ClientState, ClientStateSelector,
} from '../../../../../types';
import type {
    CommonStateRegimentTemplate,
} from '../../../../../../../../common/src/state/modules/_children/orders/reducer/types';

export const isAttackFormValidSelector: ClientStateSelector< boolean, void >
    = createSelector<ClientState,
        void,
        boolean,
        ?string,
        CommonStateRegimentTemplate,
        >(
            attackingCityIdSelector,
            regimentTemplateSelector,
            (
                attackingCityId, regimentTemplate,
            ) => {

                return (
                    attackingCityId != null
                && calculateStateMinimumRegimentSize(
                    {
                        regimentTemplate,
                    },
                ) > 0
                );

            },
        );
