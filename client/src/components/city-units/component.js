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
import classNames from 'classnames';


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
        activeUnit,
        city,
        isVisible,
        rules,
        selectCityViewUnit,
        unitStats,
    }: Props,
) => {

    if (!isVisible || rules == null) {
        return null;
    }

    const unitComponents = unitsOrder.map(unitType => {
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

        const onClick = (event) => {
            selectCityViewUnit({ unitType });
        };

        const className = classNames(
            'parchment-bg relative group flex flex-col w-8 sm:w-12 md:w-16 lg:w-20 xl:w-24 m-1 border-double rounded-t-lg rounded-b-lg rounded-sm shadow-2xs bg-gray-400 hover:bg-gray-300',
            {
                'border-4': unitType === activeUnit,
            },
        );

        return (
            <div
                key={unitType}
                className={className}
                onClick={onClick}
            >
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

    const unitStat = unitStats[activeUnit];
    const unitVisual = unitVisuals[activeUnit];

    return (
        <div data-testid={testId} role="tabpanel">
            <CityItemsListComponent>{unitComponents}</CityItemsListComponent>
            <div className="parchment-bg w-full h-full">
                <p className="text-lg">{unitVisual.name}</p>
                <table className="border-collapse table-fixed">
                    <tbody>
                        <tr>
                            <td>Attack</td>
                            <td>{unitStat.attack}</td>
                        </tr>
                        <tr>
                            <td>Defence</td>
                            <td>{unitStat.defence}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};
