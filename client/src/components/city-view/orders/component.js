// @flow

import {
    CityOrdersScheduledAttackInfoComponent,
} from './scheduled-attack-info';
import {
    CityOrdersScheduledAttackItemComponent,
} from './scheduled-attack-item';
import {
    testIds,
} from '../../../../../common/src/ui';
import React from 'react';
import type {
    Props,
} from './props';
import type {
    ScheduledAttackOrderInfo,
} from '../../../state/modules/selectors/types';

export const Component = (
    {
        activeOrderId,
        isVisible,
        orderInfosById,
        selectCityViewOrdersTab,
    }: Props,
) => {

    if ( !isVisible || orderInfosById == null ) {

        return null;

    }

    const orderRowComponents = Object.keys(
        orderInfosById,
    )
        .map(
            (
                orderId: string,
            ) => {

                const orderInfo: ?ScheduledAttackOrderInfo
                    = orderInfosById[ orderId ];

                if ( orderInfo == null ) {

                    throw Error(
                        `missing order info`,
                    );

                }

                const isSelected = orderId === activeOrderId;

                const onClick = () => {

                    selectCityViewOrdersTab(
                        {
                            orderId,
                        },
                    );

                };

                return (
                    <div key={orderId} onClick={onClick}>
                        <CityOrdersScheduledAttackItemComponent
                            isActive={isSelected}
                            item={orderInfo}
                        />
                    </div>
                );

            },
        );

    const infoComponent
        = activeOrderId == null
            ? null
            : (
                <CityOrdersScheduledAttackInfoComponent
                    regimentTemplate={
                        orderInfosById[ activeOrderId ].regimentTemplate
                    }
                />
            );

    const panelComponent = orderRowComponents.length > 0
        ? (
            <div
                className="flex flex-row justify-around w-full h-full p-1 text-lg shadow-inner text-gray-100"
            >
                <div
                    className="flex flex-col w-1/3 m-1 shadow-inner bg-gray-900-alpha-50">
                    {orderRowComponents}
                </div>
                <div
                    className="flex flex-row w-1/3 m-1 shadow-inner bg-gray-900-alpha-50">
                    {infoComponent}
                </div>
            </div>
        )
        : (
            <div className="flex flex-row justify-around">
                No orders
            </div>
        );


    return (
        <div
            data-testid={testIds.cityView.ordersPanel}
            role="tabpanel"
        >
            {panelComponent}
        </div>
    );

};
