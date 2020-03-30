// @flow

import { createSelector } from 'reselect';
import type {
    CommonStateOrders,
    CommonStateScheduledAttackOrder,
} from '../../../../../../common/src/state/modules/orders/reducer/types';
import { clientStateMenuSelectors } from '../../_children/menu/selectors';
import { clientStateCommonStateSelectors } from '../../_children/common-state/selectors';
import type { ClientState, ClientStateSelector } from '../../../types';
import type {
    ScheduledAttackOrderInfo,
    ScheduledAttackOrderInfosById,
} from '../types';


export const scheduledAttackOrdersForViewedCitySelector: ClientStateSelector<ScheduledAttackOrderInfosById> =
    createSelector<ClientState, void, ScheduledAttackOrderInfosById, ?string, ?CommonStateOrders>(
        clientStateMenuSelectors.currentlyViewedCityId,
        clientStateCommonStateSelectors.orders,
        (currentlyViewedCityId: ?string, orders: ?CommonStateOrders) => {
            if (currentlyViewedCityId == null || orders == null) {
                return {};
            }

            return Object
                .keys(orders.items.scheduledAttack)
                .reduce(
                    (ordersForViewedCity: ScheduledAttackOrderInfosById, orderId: string) => {
                        const order: ?CommonStateScheduledAttackOrder =
                            orders.items.scheduledAttack[orderId];

                        if (order == null) {
                            throw Error('order is missing');
                        }

                        const relevantForViewedCity: boolean = currentlyViewedCityId === order.originCityId;

                        const orderInfo: ScheduledAttackOrderInfo = {
                            ...order,
                            creationTime: orders.creationTimes[orderId],
                            playerId: orders.ownerships[orderId],
                        };

                        return relevantForViewedCity ?
                            {
                                ...ordersForViewedCity,
                                [orderId]: orderInfo,
                            } :
                            ordersForViewedCity;
                    },
                    {},
                );
        },
    );

