// @flow

import * as romanDecimalConverter from 'roman-decimal';
import {
    CityItemsListComponent,
} from '../items-list';
import {
    ImageComponent,
} from '../../image';
import {
    buildingVisuals,
    buildingsOrder,
} from '../../../assets/images/buildings';
import {
    numberToQuantityString,
} from '../../../../../common/src/utils';
import {
    testIds,
} from '../../../../../common/src/ui';
import React from 'react';
import classNames from 'classnames';
import type {
    Props,
} from './props';

export const Component = (
    {
        activeBuilding,
        city,
        isVisible,
        rules,
        selectCityViewBuildingsTab,
    }: Props,
) => {

    if ( !isVisible || rules == null ) {

        return null;

    }

    const buildingComponents = buildingsOrder.map(
        (
            buildingType,
        ) => {

            const buildingTier = city.buildings[ buildingType ].tier;
            const buildingVisual = buildingVisuals[ buildingType ];

            const onClick = () => {

                selectCityViewBuildingsTab(
                    {
                        buildingType,
                    },
                );

            };

            const isSelected = buildingType === activeBuilding;

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
                <div
                    key={buildingType}
                    className={parentClassName}
                    onClick={onClick}
                >
                    <p className="text-sm text-center font-medium text-gray-100">
                        {numberToQuantityString(
                            {
                                value: 1,
                            },
                        )}
                    </p>
                    <ImageComponent image={buildingVisual.image} ratio="75%">
                        <div
                            className="absolute top-1/2 w-full bg-gray-100-alpha-50">
                            <p className="text-xl object-center text-center font-medium text-gray-900">
                                {romanDecimalConverter.roman(
                                    buildingTier,
                                )}
                            </p>
                        </div>
                    </ImageComponent>
                    <p className={nameClassName}>{buildingVisual.name}</p>
                </div>
            );

        },
    );

    const activeBuildingVisual = buildingVisuals[ activeBuilding ];

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
            )}
        >
            <p className="m-1 text-2xl text-center">
                {activeBuildingVisual.name}
            </p>
            <div className="flex flex-row justify-around"/>
            <div className="m-1 text-xs shadow-inner">
                {activeBuildingVisual.description}
            </div>
        </div>
    );

    return (
        <div data-testid={testIds.cityView.buildingsPanel} role="tabpanel">
            <CityItemsListComponent>
                {buildingComponents}
            </CityItemsListComponent>
            {infoComponent}
        </div>
    );

};
