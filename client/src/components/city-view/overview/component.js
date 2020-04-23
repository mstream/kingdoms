// @flow

import {
    UNIT_NOBLE,
    UNIT_PEASANT,
} from '../../../../../common/src/state/modules/_children/rules/reducer/types';
import {
    testIds,
} from '../../../../../common/src/ui';
import React from 'react';
import type {
    CommonStateUnitKey,
} from '../../../../../common/src/state/modules/_children/rules/reducer/types';
import type {
    Props,
} from './props';

export const Component = (
    {
        city,
        isVisible
        ,
    }: Props,
) => {

    if ( !isVisible ) {

        return null;

    }

    const peasantsQuantity = city.units[ UNIT_PEASANT ];
    const noblesQuantity = city.units[ UNIT_NOBLE ];
    const armyQuantity = Object
        .keys(
            city.units,
        )
        .reduce(
            (
                armyQuantity, unitType: CommonStateUnitKey,
            ) => {

                return armyQuantity + city.units[ unitType ];

            },
            -( peasantsQuantity + noblesQuantity ),
        );

    const unitsPeasantsStatus = `Peasants: ${ peasantsQuantity }`;
    const unitsArmyPeasantsStatus = `Army: ${ armyQuantity }`;
    const unitsNobilityPeasantsStatus = `Nobles: ${ noblesQuantity }`;

    return (
        <div
            data-testid={testIds.cityView.overviewPanel}
            className="flex flex-row p-1 text-lg text-gray-100"
            role="tabpanel"
        >
            <div className="flex flex-col p-1 mx-2">
                <p className="text-md">Buildings</p>
                <p>info</p>
                <p>info</p>
            </div>
            <div className="flex flex-col p-1 mx-2">
                <p className="text-md">Orders</p>
                <p>info</p>
                <p>info</p>
            </div>
            <div className="flex flex-col p-1 mx-2">
                <p className="text-md">Resources</p>
                <p>info</p>
                <p>info</p>
            </div>
            <div className="flex flex-col p-1 mx-2">
                <p className="text-md">Units</p>
                <p>{unitsPeasantsStatus}</p>
                <p>{unitsArmyPeasantsStatus}</p>
                <p>{unitsNobilityPeasantsStatus}</p>
            </div>
        </div>
    );

};
