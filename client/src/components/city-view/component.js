// @flow

import React from 'react';
import type { Props } from './props';
import { CityHeaderComponent } from '../city-header';
import { CityViewTabsComponent } from '../city-view-tabs';
import { CityUnitsComponent } from '../city-units';
import { CityResourcesComponent } from '../city-resources';
import { CityBuildingsComponent } from '../city-buildings';
import { CityOverviewComponent } from '../city-overview';


export const Component = (
    {
        activeTab,
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
        <div
            className="modal top-0 left-0 w-full h-full flex items-center justify-center rounded-t">
            <div
                onClick={onBackgroundClick}
                className="modal-overlay absolute w-full h-full bg-black opacity-75 top-0 left-0 cursor-pointer"
            />
            <div
                className="bricks-bg absolute w-9/12 rounded-sm shadow-lg flex flex-col items-center justify-center text-2xl bg-gray-800">
                <CityHeaderComponent/>
                <CityViewTabsComponent/>
                <CityOverviewComponent/>
                <CityUnitsComponent/>
                <CityResourcesComponent/>
                <CityBuildingsComponent/>
            </div>
        </div>
    );
};
