// @flow

import type { ClientStateMenu } from '../types';
import type { ClientCloseAttackViewAction } from '../../actions/types';
import { emptyRegimentTemplateState } from '../../../../../../../../common/src/state/modules/orders/reducer/state';
import type { ClientStateActionReducer } from '../../../../../types';

type Reducer = ClientStateActionReducer<ClientStateMenu, ClientCloseAttackViewAction>;


export const closeAttackViewMenuReducer: Reducer = (
    {
        localState,
        action,
        globalState,
    },
) => {
    return {
        ...localState,
        attackView: {
            ...localState.attackView,
            attackedCityId: null,
            attackingCityId: null,
            regimentTemplate: emptyRegimentTemplateState,
        },
    };
};
