// @flow

import React from 'react';
import type { Props } from './props';
import { ImageComponent } from '../image';
import { CityItemsListComponent } from '../city-items-list';
import { buildingVisuals } from '../../assets/images/buildings';
import { convertQuantitiesToResources } from '../../../../common/src/resource';
import { subtractQuantities } from '../../../../common/src/quantity';
import classNames from 'classnames';
import romanDecimalConverter from 'roman-decimal';
import { CostInfoComponent } from '../cost-info';
import { calculateBuildingsUpgradeCost } from '../../../../common/src/state/state';

export const testId = 'city-buildings';

export const Component = (
    {
        city,
        cityId,
        isVisible,
        requestBuildingUpgrade,
        rules,
    }: Props) => {

    if (!isVisible || rules == null) {
        return null;
    }

    const { buildings, resources } = city;

    const buildingComponents = Object.keys(buildings).map(buildingType => {
        const building = buildings[buildingType];
        const buildingVisual = buildingVisuals[buildingType];
        const isDisabled = building.tier === 0;

        const requiredResources = calculateBuildingsUpgradeCost({
            buildingTier: building.tier,
            buildingType,
            rules,
        });

        const availableResourcesAfter = convertQuantitiesToResources({
            quantities: subtractQuantities({
                quantities1: resources,
                quantities2: requiredResources,
            }),
        });

        const canBeUpgraded = !Object
            .keys(availableResourcesAfter)
            .map(resourceType => availableResourcesAfter[resourceType])
            .some(quantity => quantity < 0);

        const bodyClassName = classNames(
            {
                'filter-grayscale': isDisabled,
                'opacity-25': isDisabled,
                'opacity-100': !isDisabled,
            },
        );

        const buttonClassName = classNames(
            'relative group bg-green-600 text-sm text-gray-100 rounded-t-lg focus:outline-none',
            {
                'cursor-pointer': canBeUpgraded,
                'cursor-not-allowed': !canBeUpgraded,
                'opacity-25': !canBeUpgraded,
                'opacity-100': canBeUpgraded,
                'hover:bg-green-400': canBeUpgraded,
            },
        );

        return (
            <div
                key={buildingType}
                className="parchment-bg relative group flex flex-col w-8 sm:w-12 md:w-16 lg:w-20 xl:w-24 m-1 rounded-t-lg rounded-b-lg shadow-2xs bg-gray-400 hover:bg-gray-300">
                <button className={buttonClassName}
                        onClick={() => requestBuildingUpgrade({
                            cityId: cityId,
                            buildingType,
                        })}>
                    {building.tier === 0 ? 'build' : 'upgrade'}
                </button>
                <div className={bodyClassName}>
                    <ImageComponent image={buildingVisual.image} ratio="100%">
                        <div
                            className="absolute top-1/2 w-full bg-gray-100-alpha-50">
                            <p className="text-xl object-center text-center font-medium text-gray-900 cursor-default">{romanDecimalConverter.roman(building.tier)}</p>
                        </div>
                    </ImageComponent>
                    <p className="text-xs text-center text-gray-100 cursor-default">{buildingVisual.name}</p>
                </div>
                <div
                    className="absolute top-full left-full invisible group-hover:visible w-16 sm:w-24 md:w-32 lg:w-40 xl:w-48 z-10 opacity-75 cursor-default pointer-events-none">
                    <CostInfoComponent
                        availableResources={resources}
                        requiredResources={requiredResources}
                    />
                </div>
            </div>
        );
    });

    return (
        <div data-testid={testId} role="tabpanel">
            <CityItemsListComponent>{buildingComponents}</CityItemsListComponent>
        </div>
    );
};