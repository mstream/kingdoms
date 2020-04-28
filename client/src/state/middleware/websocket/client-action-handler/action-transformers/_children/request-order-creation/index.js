// @flow


import {
    generateId,
} from '../../../../../../../../../common/src/utils';
import {
    ordersActions,
} from '../../../../../../../../../common/src/state/modules/_children/orders/actions';

import type {
    ActionTransformer,
} from '../../types';
import type {

    ClientRequestOrderCreationAction,
} from '../../../../../../modules/_children/common-state/actions/types';
import type {
    CommonCreateScheduledAttackOrderAction,
} from '../../../../../../../../../common/src/state/modules/_children/orders/types';


type Transformer = ActionTransformer< ClientRequestOrderCreationAction,
    CommonCreateScheduledAttackOrderAction, >

export const transformer: Transformer = (
    {
        clientAction, username,
    },
) => {

    return ordersActions.createScheduledAttackOrder(
        {
            ...clientAction.payload,
            orderId : generateId(),
            playerId: username,
        },
    );

};
