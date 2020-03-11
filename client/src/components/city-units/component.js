// @flow

import React from 'react';
import { numberToQuantityString } from '../../../../common/src/util';
import type {
    CommonStateDamage,
    UnitType,
} from '../../../../common/src/state/state';
import {
    ARMOR_HEAVY,
    ARMOR_LIGHT,
    ARMOR_MEDIUM,
    ARMOR_NONE,
    calculateBuildingTierSum,
    calculatePeasantChangeInfo,
    calculateResourceChangeInfo,
    convertChangeInfoToChangeRate,
    RESOURCE_FOOD,
    UNIT_ARCHER,
    UNIT_CATAPULT,
    UNIT_KNIGHT,
    UNIT_NOBLE,
    UNIT_PEASANT,
    UNIT_PIKEMAN,
    UNIT_SWORDMAN,
} from '../../../../common/src/state/state';
import { ImageComponent } from '../image';
import { CityItemsListComponent } from '../city-items-list';
import { armor, food, speed, sword } from '../../assets/images/icons';
import { unitVisuals } from '../../assets/images/units';
import { ChangeInfoComponent } from '../change-info';
import classNames from 'classnames';
import type { Props } from './props';

export const testId = 'city-units';

const unitsOrder: $ReadOnlyArray<UnitType> = [
    UNIT_PEASANT,
    UNIT_PIKEMAN,
    UNIT_ARCHER,
    UNIT_SWORDMAN,
    UNIT_KNIGHT,
    UNIT_CATAPULT,
    UNIT_NOBLE,
];

const armorDescriptions = {
    [ARMOR_NONE]: 'none',
    [ARMOR_LIGHT]: 'light',
    [ARMOR_MEDIUM]: 'medium',
    [ARMOR_HEAVY]: 'heavy',
};

const formatDamageString = ({ damage }: { damage: CommonStateDamage }) => {
    return `${numberToQuantityString({ value: damage[ARMOR_NONE] })}/${numberToQuantityString({ value: damage[ARMOR_LIGHT] })}/${numberToQuantityString({ value: damage[ARMOR_MEDIUM] })}/${numberToQuantityString({ value: damage[ARMOR_HEAVY] })}`;
};

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
                resourceType: RESOURCE_FOOD,
                rules,
            }),
        });

        const changeInfo = calculatePeasantChangeInfo({
            buildingTiersSum,
            unitsQuantity: unitsQuantity,
            food: city.resources[RESOURCE_FOOD],
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
                <ImageComponent
                    image={unitVisual.image}
                    ratio="100%"
                />
                <p className="text-xs text-center text-gray-100">{unitVisual.name}</p>
            </div>
        );
    });

    const unitStat = unitStats[activeUnit];
    const unitVisual = unitVisuals[activeUnit];
    const armorDescription = armorDescriptions[unitStat.armor];

    return (
        <div data-testid={testId} role="tabpanel">
            <CityItemsListComponent>{unitComponents}</CityItemsListComponent>
            <div className="parchment-bg w-full h-full">
                <p className="text-lg">{unitVisual.name}</p>
                <table className="border-collapse table-fixed">
                    <tbody>
                        <tr>
                            <td className="w-8 p-1">
                                <ImageComponent
                                    className="filter-invert"
                                    image={sword}
                                    ratio="100%"
                                />
                            </td>
                            <td>{formatDamageString({ damage: unitStat.damage })}</td>
                        </tr>
                        <tr>
                            <td className="w-8 p-1">
                                <ImageComponent
                                    className="filter-invert"
                                    image={armor}
                                    ratio="100%"
                                />
                            </td>
                            <td>{armorDescription}</td>
                        </tr>
                        <tr>
                            <td className="w-8 p-1">
                                <ImageComponent
                                    className="filter-invert"
                                    image={speed}
                                    ratio="100%"
                                />
                            </td>
                            <td>{`${numberToQuantityString({ value: unitStat.speed })}/h`}</td>
                        </tr>
                        <tr>
                            <td className="w-8 p-1">
                                <ImageComponent
                                    className="filter-invert"
                                    image={food}
                                    ratio="100%"
                                /></td>
                            <td>{`${numberToQuantityString({ value: unitStat.foodDemand })}/h`}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};
