// @flow

import React from 'react';
import { numberToQuantityString } from '../../../../common/src/util';
import type {
    CommonStateDamage,
    UnitType,
} from '../../../../common/src/state';
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
} from '../../../../common/src/state';
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

            const isSelected = unitType === activeUnit;

            const parentClassName = classNames(
                'parchment-bg relative group flex flex-col w-8 sm:w-12 md:w-16 lg:w-20 xl:w-24 border-solid border-l border-r border-t border-gray-900 rounded-t-lg shadow-2xs',
                {
                    'border-0': isSelected,
                    'border-b': !isSelected,
                    'bg-gray-400': !isSelected,
                    'hover:bg-gray-200': !isSelected,
                },
            );

            const nameClassName = classNames(
                'text-xs text-center text-gray-100',
                {
                    'invisible': isSelected,
                },
            );

            return (
                <div
                    key={unitType}
                    className={parentClassName}
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
                    <p className={nameClassName}>{unitVisual.name}</p>
                </div>
            );
        });

        const activeUnitStat = unitStats[activeUnit];
        const activeUnitVisual = unitVisuals[activeUnit];
        const activeUnitArmorDescription = armorDescriptions[activeUnitStat.armor];
        
        const statsComponent = (
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
                        <td>{formatDamageString({ damage: activeUnitStat.damage })}</td>
                    </tr>
                    <tr>
                        <td className="w-8 p-1">
                            <ImageComponent
                                className="filter-invert"
                                image={armor}
                                ratio="100%"
                            />
                        </td>
                        <td>{activeUnitArmorDescription}</td>
                    </tr>
                    <tr>
                        <td className="w-8 p-1">
                            <ImageComponent
                                className="filter-invert"
                                image={speed}
                                ratio="100%"
                            />
                        </td>
                        <td>{`${numberToQuantityString({ value: activeUnitStat.speed })}/h`}</td>
                    </tr>
                    <tr>
                        <td className="w-8 p-1">
                            <ImageComponent
                                className="filter-invert"
                                image={food}
                                ratio="100%"
                            /></td>
                        <td>{`${numberToQuantityString({ value: activeUnitStat.foodDemand })}/h`}</td>
                    </tr>
                </tbody>
            </table>
        );

        const changeComponent = (
            <div>CHANGE_INFO</div>
        );

        const infoComponent = (
            <div
                className="parchment-bg flex flex-col w-full h-full border-solid border-l border-r border-b rounded-b border-gray-900">
                <p className="text-lg">{activeUnitVisual.name}</p>
                <div className="flex flex-row justify-around">
                    {statsComponent}
                    {changeComponent}
                </div>
                <div>
                    UNIT_DESCRIPTION
                </div>
            </div>
        );

        return (
            <div data-testid={testId} role="tabpanel">
                <CityItemsListComponent>{unitComponents}</CityItemsListComponent>
                {infoComponent}
            </div>
        );
    }
;
