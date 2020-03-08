// @flow

import React from 'react';
import type { Props } from './props';
import { unitVisuals } from '../../assets/images/units';
import type { CommonStateUnits } from '../../../../common/src/state';
import {
    calculateBuildingTierSum,
    calculatePeasantChangeInfo,
    calculateResourceChangeInfo,
    convertChangeInfoToChangeRate,
} from '../../../../common/src/state';
import { numberToQuantityString } from '../../../../common/src/util';
import { ChangeInfoComponent } from '../change-info';
import { ImageComponent } from '../image';
import { CityItemsListComponent } from '../city-items-list';

export const testId = 'city-units';

const unitsOrder: $ReadOnlyArray<$Keys<CommonStateUnits>> = [
    'peasant',
    'pikeman',
    'archer',
    'swordman',
    'knight',
    'catapult',
    'noble',
];

export const Component = (
    {
        city,
        isVisible,
        rules,
    }: Props,
) => {

    if (!isVisible || rules == null) {
        return null;
    }

    const unitsComponents = unitsOrder.map(unitType => {
        const unitsQuantity = city.units[unitType];
        const unitVisual = unitVisuals[unitType];
        const buildingTiersSum = calculateBuildingTierSum({ buildings: city.buildings });
        const foodChangeRate = convertChangeInfoToChangeRate({
            changeInfo: calculateResourceChangeInfo({
                city,
                resourceType: 'food',
                rules,
            }),
        });

        const changeInfo = calculatePeasantChangeInfo({
            buildingTiersSum,
            unitsQuantity: unitsQuantity,
            food: city.resources.food,
            foodChangeRate,
            rules,
        });

        return (
            <div
                key={unitType}
                className="parchment-bg relative group flex flex-col w-8 sm:w-12 md:w-16 lg:w-20 xl:w-24 m-1 rounded-t-lg rounded-b-lg rounded-sm shadow-2xs bg-gray-400 hover:bg-gray-300">
                <p className="text-sm text-center font-medium text-gray-100">{numberToQuantityString({ value: unitsQuantity })}</p>
                <div
                    className="absolute top-full left-full invisible group-hover:visible w-16 sm:w-24 md:w-32 lg:w-40 xl:w-48 z-10 opacity-75 cursor-default pointer-events-none">
                    <ChangeInfoComponent changeInfo={changeInfo}/>
                </div>
                <ImageComponent image={unitVisual.image} ratio="100%"/>
                <p className="text-xs text-center text-gray-100">{unitVisual.name}</p>
            </div>
        );
    });

    return (
        <div data-testid={testId} role="tabpanel">
            <CityItemsListComponent>{unitsComponents}</CityItemsListComponent>
        </div>
    );
};
