// @flow

import React from 'react';
import type {
    Props,
} from './props';
import {
    numberToQuantityString,
} from '../../../../../common/src/utils';
import {
    ChangeInfoComponent,
} from '../../change-info';
import {
    ImageComponent,
} from '../../image';
import {
    CityItemsListComponent,
} from '../items-list';
import classNames from 'classnames';
import {
    resourceVisuals,
    resourcesOrder,
} from '../../../assets/images/resources';
import {
    calculateResourceChangeInfo,
} from '../../../../../common/src/state';
import {
    testIds,
} from '../../../../../common/src/ui';

export const Component = (
    {
        activeResource,
        city,
        isVisible,
        rules,
        selectCityViewResourcesTab,
    }: Props,
) => {

    if ( !isVisible || rules == null ) {

        return null;

    }

    const resourceComponents = resourcesOrder.map(
        (
            resourceType,
        ) => {

            const resourceQuantity = city.resources[ resourceType ];
            const resourceVisual = resourceVisuals[ resourceType ];

            const onClick = () => {

                selectCityViewResourcesTab(
                    {
                        resourceType,
                    },
                );

            };

            const isSelected = resourceType === activeResource;

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
                    key={resourceType}
                    className={parentClassName}
                    onClick={onClick}
                >
                    <p className="text-sm text-center font-medium text-gray-100">
                        {numberToQuantityString(
                            {
                                value: resourceQuantity,
                            },
                        )}
                    </p>
                    <ImageComponent image={resourceVisual.image} ratio="100%"/>
                    <p className={nameClassName}>{resourceVisual.name}</p>
                </div>
            );

        },
    );

    const activeResourceVisual = resourceVisuals[ activeResource ];

    const changeInfo = calculateResourceChangeInfo(
        {
            city,
            resourceType: activeResource,
            rules,
        },
    );

    const changeComponent = (
        <div className="m-1">
            <ChangeInfoComponent changeInfo={changeInfo}/>
        </div>
    );

    const infoComponent = (
        <div
            className="parchment-bg flex flex-col w-full h-full border-solid border-l border-r border-b rounded-b border-gray-900">
            <p className="m-1 text-2xl text-center">
                {activeResourceVisual.name}
            </p>
            <div className="flex flex-row justify-around">
                {changeComponent}
            </div>
            <div className="m-1 text-xs shadow-inner">
                {activeResourceVisual.description}
            </div>
        </div>
    );

    return (
        <div data-testid={testIds.COMPONENT_CITY_VIEW.RESOURCES} role="tabpanel">
            <CityItemsListComponent>
                {resourceComponents}
            </CityItemsListComponent>
            {infoComponent}
        </div>
    );

};
