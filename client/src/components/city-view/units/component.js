// @flow

import {
    ARMOR_HEAVY,
    ARMOR_LIGHT,
    ARMOR_MEDIUM,
    ARMOR_NONE,
    RESOURCE_FOOD,
} from '../../../../../common/src/state/modules/_children/rules/reducer/types';
import {
    ChangeInfoComponent,
} from '../../change-info';
import {
    CityItemsListComponent,
} from '../items-list';
import {
    ImageComponent,
} from '../../image';
import {
    armor, food, speed, sword,
} from '../../../assets/images/icons';
import {
    calculateBuildingTierSum,
    calculatePeasantChangeInfo,
    calculateResourceChangeInfo,
    convertChangeInfoToChangeRate,
} from '../../../../../common/src/state';
import {
    numberToQuantityString,
} from '../../../../../common/src/utils';
import {
    testIds,
} from '../../../../../common/src/ui';
import {
    unitVisuals, unitsOrder,
} from '../../../assets/images/units';
import React from 'react';
import classNames from 'classnames';
import type {
    CommonStateDamage,
} from '../../../../../common/src/state/modules/_children/rules/reducer/types';
import type {
    Props,
} from './props';

const armorDescriptions = {
    [ ARMOR_HEAVY ] : `heavy`,
    [ ARMOR_LIGHT ] : `light`,
    [ ARMOR_MEDIUM ]: `medium`,
    [ ARMOR_NONE ]  : `none`,
};

const formatDamageString = (
    {
        damage,
    }: { damage: CommonStateDamage },
) => {

    return `${ numberToQuantityString(
        {
            value: damage[ ARMOR_NONE ],
        },
    ) }/${ numberToQuantityString(
        {
            value: damage[ ARMOR_LIGHT ],
        },
    ) }/${ numberToQuantityString(
        {
            value: damage[ ARMOR_MEDIUM ],
        },
    ) }/${ numberToQuantityString(
        {
            value: damage[ ARMOR_HEAVY ],
        },
    ) }`;

};

export const Component = (
    {
        activeUnit,
        city,
        isVisible,
        rules,
        selectCityViewUnitsTab,
        unitStats,
    }: Props,
) => {

    if ( !isVisible || rules == null ) {

        return null;

    }

    const unitComponents = unitsOrder.map(
        (
            unitType,
        ) => {

            const unitQuantity = city.units[ unitType ];
            const unitVisual = unitVisuals[ unitType ];

            const onClick = () => {

                selectCityViewUnitsTab(
                    {
                        unitType,
                    },
                );

            };

            const isSelected = unitType === activeUnit;

            const parentClassName = classNames(
                `parchment-bg`,
                `relative`,
                `group`,
                `flex`,
                `flex-col`,
                `w-8`,
                `sm:w-12`,
                `md:w-16`,
                `lg:w-20`,
                `xl:w-24`,
                `border-solid`,
                `border-l`,
                `border-r`,
                `border-t`,
                `border-gray-900`,
                `rounded-t-lg`,
                `shadow-2xs`,
                {
                    'bg-gray-400'      : !isSelected,
                    'border-0'         : isSelected,
                    'border-b'         : !isSelected,
                    'cursor-default'   : isSelected,
                    'cursor-pointer'   : !isSelected,
                    'hover:bg-gray-200': !isSelected,
                },
            );

            const nameClassName = classNames(
                `text-xs text-center text-gray-100`,
                {
                    invisible: isSelected,
                },
            );

            return (
                <div key={unitType} className={parentClassName}
                    onClick={onClick}>
                    <p className="text-sm text-center font-medium text-gray-100">
                        {numberToQuantityString(
                            {
                                value: unitQuantity,
                            },
                        )}
                    </p>
                    <ImageComponent image={unitVisual.image} ratio="100%"/>
                    <p className={nameClassName}>{unitVisual.name}</p>
                </div>
            );

        },
    );

    const activeUnitStat = unitStats[ activeUnit ];
    const activeUnitVisual = unitVisuals[ activeUnit ];
    const activeUnitArmorDescription = armorDescriptions[ activeUnitStat.armor ];

    const statsComponent = (
        <table className="m-1 border-collapse table-fixed text-lg shadow-inner">
            <tbody>
                <tr>
                    <td className="w-8 p-1">
                        <ImageComponent
                            className="filter-invert"
                            image={sword}
                            ratio="100%"
                        />
                    </td>
                    <td>
                        {formatDamageString(
                            {
                                damage: activeUnitStat.damage,
                            },
                        )}
                    </td>
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
                    <td>{`${ numberToQuantityString(
                        {
                            value: activeUnitStat.speed,
                        },
                    ) }/h`}</td>
                </tr>
                <tr>
                    <td className="w-8 p-1">
                        <ImageComponent
                            className="filter-invert"
                            image={food}
                            ratio="100%"
                        />
                    </td>
                    <td>{`${ numberToQuantityString(
                        {
                            value: activeUnitStat.foodDemand,
                        },
                    ) }/h`}</td>
                </tr>
            </tbody>
        </table>
    );

    const activeUnitQuantity = city.units[ activeUnit ];

    const buildingTiersSum = calculateBuildingTierSum(
        {
            buildings: city.buildings,
        },
    );

    const foodChangeRate = convertChangeInfoToChangeRate(
        {
            changeInfo: calculateResourceChangeInfo(
                {
                    city,
                    resourceType: RESOURCE_FOOD,
                    rules,
                },
            ),
        },
    );

    const changeInfo = calculatePeasantChangeInfo(
        {
            buildingTiersSum,
            food         : city.resources[ RESOURCE_FOOD ],
            foodChangeRate,
            rules,
            unitsQuantity: activeUnitQuantity,
        },
    );

    const changeComponent = (
        <div className="m-1">
            <ChangeInfoComponent changeInfo={changeInfo}/>
        </div>
    );

    const infoComponent = (
        <div
            className={classNames(
                `parchment-bg`,
                `flex`,
                `flex-col`,
                `w-full`,
                `h-full`,
                `border-solid`,
                `border-l`,
                `border-r`,
                `border-b`,
                `rounded-b`,
                `border-gray-900`,
            )}>
            <p className="m-1 text-2xl text-center">{activeUnitVisual.name}</p>
            <div className="flex flex-row justify-around">
                {statsComponent}
                {changeComponent}
            </div>
            <div className="m-1 text-xs shadow-inner">
                {activeUnitVisual.description}
            </div>
        </div>
    );

    return (
        <div data-testid={testIds.cityView.unitsPanel} role="tabpanel">
            <CityItemsListComponent>{unitComponents}</CityItemsListComponent>
            {infoComponent}
        </div>
    );

};
