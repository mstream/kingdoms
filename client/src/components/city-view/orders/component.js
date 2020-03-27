// @flow

import React from 'react';
import type { Props } from './props';

export const testId = 'city-orders';

export const Component = (
    {
        cities,
        isVisible,
        orders,
    }: Props) => {

    if (!isVisible) {
        return null;
    }

    const orderRowComponents = Object
        .keys(orders)
        .map((orderId => {
            const order = orders[orderId];
            const originCityName = cities[order.originCityId].name;
            const targetCityName = cities[order.targetCityId].name;
            return (
                <tr key={orderId}>
                    <td>{originCityName}</td>
                    <td>{targetCityName}</td>
                </tr>
            );
        }));

    return (
        <div
            data-testid={testId}
            className="flex flex-col p-1 text-lg text-gray-100"
            role="tabpanel"
        >
            <table data-testid={testId}
                   className="table-fixed border-separate shadow-inner">
                <tbody>
                    {orderRowComponents}
                </tbody>
            </table>
        </div>
    );
};
