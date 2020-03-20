// @flow

import React from 'react';
import type { Props } from './props';
import { CityHeaderComponent } from './header';
import { CityViewTabsComponent } from './view-tabs';
import { CityUnitsComponent } from './units';
import { CityResourcesComponent } from './resources';
import { CityBuildingsComponent } from './buildings';
import { CityOverviewComponent } from './overview';

export const testId = 'city-view';


export const Component = (
    {
        city,
        cityId,
        closeCityView,
    }: Props) => {

    if (cityId == null || city == null) {
        return null;
    }

    const onBackgroundClick = () => {
        closeCityView();
    };

    return (
        <div data-testid={testId}
             className="modal top-0 left-0 w-full h-full flex items-center justify-center rounded-t">
            <div
                onClick={onBackgroundClick}
                className="modal-overlay absolute w-full h-full bg-black opacity-75 top-0 left-0 cursor-pointer"
            />
            <div
                className="bricks-bg absolute w-9/12 min-h-3/4 rounded-sm shadow-lg flex flex-col items-center justify-start overflow-hidden text-2xl bg-gray-800">
                <CityHeaderComponent/>
                <CityViewTabsComponent/>
                <div className="m-auto">
                    <CityOverviewComponent/>
                    <CityUnitsComponent/>
                    <CityResourcesComponent/>
                    <CityBuildingsComponent/>
                </div>
            </div>
        </div>
    );
};
