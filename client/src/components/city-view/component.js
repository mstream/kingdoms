// @flow

import {
    CityBuildingsComponent,
} from './buildings';
import {
    CityHeaderComponent,
} from './header';
import {
    CityOrdersComponent,
} from './orders';
import {
    CityOverviewComponent,
} from './overview';
import {
    CityResourcesComponent,
} from './resources';
import {
    CityUnitsComponent,
} from './units';
import {
    CityViewTabsComponent,
} from './view-tabs';
import {
    testIds,
} from '../../../../common/src/ui';
import React from 'react';
import classNames from 'classnames';
import type {
    Props,
} from './props';

export const Component = (
    {
        city, cityId, closeCityView,
    }: Props,
) => {

    if ( cityId == null || city == null ) {

        return null;

    }

    const onBackgroundClick = () => {

        closeCityView();

    };

    return (
        <div
            data-testid={testIds.COMPONENT_CITY_VIEW.PARENT}
            className={
                classNames(
                    `modal`,
                    `top-0`,
                    `left-0`,
                    `w-full`,
                    `h-full`,
                    `flex`,
                    `items-center`,
                    `justify-center`,
                    `rounded-t`,
                )
            }
        >
            <div
                onClick={onBackgroundClick}
                className={
                    classNames(
                        `modal-overlay`,
                        `absolute`,
                        `w-full`,
                        `h-full`,
                        `bg-black`,
                        `opacity-75`,
                        `top-0`,
                        `left-0`,
                        `cursor-pointer`,
                    )
                }
            />
            <div
                className={classNames(
                    `bricks-bg`,
                    `absolute`,
                    `w-9/12`,
                    `min-h-3/4`,
                    `rounded-sm`,
                    `shadow-lg`,
                    `flex`,
                    `flex-col`,
                    `items-center`,
                    `justify-start`,
                    `overflow-hidden`,
                    `text-2xl`,
                    `bg-gray-800`,
                )}
            >
                <CityHeaderComponent/>
                <CityViewTabsComponent/>
                <div
                    className="flex flex-col justify-around w-full h-full m-auto">
                    <div className="flex flex-row justify-around w-full h-full">
                        <CityBuildingsComponent/>
                        <CityOrdersComponent/>
                        <CityOverviewComponent/>
                        <CityResourcesComponent/>
                        <CityUnitsComponent/>
                    </div>
                </div>
            </div>
        </div>
    );

};
