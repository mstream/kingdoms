// @flow

import { createSelector } from 'reselect';
import type { ClientState, ClientStateSelector } from '../../types';
import type { CommonStateOrders } from '../../../../../../common/src/state/modules/orders/reducer/types';
import { clientStateMenuSelectors } from '../../menu/selectors';
import { clientStateCommonStateSelectors } from '../../common-state/selectors';


export const ordersForViewedCitySelector: ClientStateSelector<CommonStateOrders> =
    createSelector<ClientState, void, CommonStateOrders, ?string, ?CommonStateOrders>(
        clientStateMenuSelectors.currentlyViewedCityId,
        clientStateCommonStateSelectors.orders,
        (currentlyViewedCityId, orders) => {
            if (currentlyViewedCityId == null || orders == null) {
                return {};
            }

            return Object
                .keys(orders)
                .reduce(
                    (ordersForViewedCity, orderId: string) => {
                        const order = orders[orderId];

                        const relevantForViewedCity =
                            currentlyViewedCityId === order.originCityId ||
                            currentlyViewedCityId === order.targetCityId;

                        return relevantForViewedCity ?
                            {
                                ...ordersForViewedCity,
                                [orderId]: order,
                            } :
                            ordersForViewedCity;
                    },
                    {},
                );
        },
    );

