// @flow


import { createSelector } from 'reselect';
import type { CommonStateRegimentTemplate } from '../../../../../../../../common/src/state/modules/orders/reducer/types';
import { calculateStateMinimumRegimentSize } from '../../../../../../../../common/src/state/modules/orders/utils';
import { attackingCityIdSelector } from './attacking-city-id';
import { regimentTemplateSelector } from './regiment-template';
import type { ClientState, ClientStateSelector } from '../../../../../types';

export const isAttackFormValidSelector: ClientStateSelector<boolean> =
    createSelector<ClientState, void, boolean, ?string, CommonStateRegimentTemplate>(
        attackingCityIdSelector,
        regimentTemplateSelector,
        (attackingCityId, regimentTemplate) => {
            return attackingCityId != null &&
                calculateStateMinimumRegimentSize({ regimentTemplate }) > 0;
        },
    );