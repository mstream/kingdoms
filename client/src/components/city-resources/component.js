// @flow

import React from 'react';
import type { Props } from './props';
import { numberToQuantityString } from '../../../../common/src/util';
import { ChangeInfoComponent } from '../change-info';
import { ImageComponent } from '../image';
import { CityItemsListComponent } from '../city-items-list';
import { resourceVisuals } from '../../assets/images/resources';
import { calculateResourceChangeInfo } from '../../../../common/src/state/state';

export const testId = 'city-resources';

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

    const resourceComponents = Object.keys(city.resources).map(resourceType => {
        const resource = city.resources[resourceType];
        const resourceVisual = resourceVisuals[resourceType];
        const changeInfo = calculateResourceChangeInfo({
            city,
            resourceType,
            rules,
        });
        return (
            <div
                key={resourceType}
                className="parchment-bg relative group flex flex-col w-4 sm:w-6 md:w-8 lg:w-10 xl:w-12 m-1 rounded-sm rounded-t-lg rounded-b-lg shadow-2xs bg-gray-400 hover:bg-gray-300">
                <p className="text-sm text-center font-medium text-gray-100">{numberToQuantityString({ value: Math.floor(resource) })}</p>
                <div
                    className="absolute top-full left-full invisible group-hover:visible w-16 sm:w-24 md:w-32 lg:w-40 xl:w-48 z-10 opacity-75 cursor-default pointer-events-none">
                    <ChangeInfoComponent changeInfo={changeInfo}/>
                </div>
                <ImageComponent image={resourceVisual.image} ratio="100%"/>
                <p className="text-xs text-center text-gray-100">{resourceVisual.name}</p>
            </div>
        );
    });

    return (
        <div data-testid={testId} role="tabpanel">
            <CityItemsListComponent>{resourceComponents}</CityItemsListComponent>
        </div>
    );
};