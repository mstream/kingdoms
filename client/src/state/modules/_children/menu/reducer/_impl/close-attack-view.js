// @flow

import {
    emptyRegimentTemplateState,
} from '../../../../../../../../common/src/state/modules/_children/orders/reducer/state';
import type {
    ClientCloseAttackViewAction,
} from '../../actions/types';
import type {
    ClientStateActionReducer,
} from '../../../../../types';
import type {
    ClientStateMenu,
} from '../types';

type Reducer = ClientStateActionReducer< ClientStateMenu,
    ClientCloseAttackViewAction, >;

export const closeAttackViewMenuReducer: Reducer = (
    {
        localState,
    },
) => {

    return {
        ...localState,
        attackView: {
            ...localState.attackView,
            attackedCityId  : null,
            attackingCityId : null,
            regimentTemplate: emptyRegimentTemplateState,
        },
    };

};
