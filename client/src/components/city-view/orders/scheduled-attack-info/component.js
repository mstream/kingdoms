// @flow

import {
    ImageComponent,
} from '../../../image';
import {
    numberToQuantityString,
} from '../../../../../../common/src/utils';
import {
    testIds,
} from '../../../../../../common/src/ui';
import {
    unitVisuals, unitsOrder,
} from '../../../../assets/images/units';
import React from 'react';
import type {
    Props,
} from './props';

export const Component = (
    {
        regimentTemplate,
    }: Props,
) => {

    const unitItemComponents = unitsOrder.map(
        (
            unitType,
        ) => {

            const quantityRange = regimentTemplate[ unitType ];

            if ( quantityRange == null || quantityRange.to === 0 ) {

                return null;

            }

            const unitVisual = unitVisuals[ unitType ];

            const fromStr = numberToQuantityString(
                {
                    value: quantityRange.from,
                },
            );

            const toStr = numberToQuantityString(
                {
                    value: quantityRange.to,
                },
            );
            const rangeStr = `${ fromStr } - ${ toStr }`;

            return (
                <div key={unitType}
                    className="flex flex-row flex-1 p-1 my-1 mx-2">
                    <div className="m-1">
                        <p className="text-sm text-center font-medium">
                            {rangeStr}
                        </p>
                        <ImageComponent image={unitVisual.image} ratio="100%"/>
                        <p className="text-xs text-center">{unitVisual.name}</p>
                    </div>
                </div>
            );

        },
    );

    return (
        <div
            data-testid={testIds.cityView.scheduledAttackInfo}
            className="flex flex-row flex-wrap"
        >
            {unitItemComponents}
        </div>
    );

};
