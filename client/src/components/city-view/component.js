// @flow

import React from 'react';
import type { Props } from './props';
import { CityHeaderComponent } from '../city-header';
import { CityViewTabsComponent } from '../city-view-tabs';
import { UnitsComponent } from '../units';
import { ResourcesComponent } from '../resources';
import { BuildingsComponent } from '../buildings';
import { TAB_BUILDINGS, TAB_RESOURCES, TAB_UNITS } from '../../state/state';


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
                {
                    activeTab === TAB_UNITS &&
                    <UnitsComponent city={city}/>
                }
                {
                    activeTab === TAB_RESOURCES &&
                    <ResourcesComponent city={city}/>
                }
                {
                    activeTab === TAB_BUILDINGS &&
                    <BuildingsComponent city={city} cityId={cityId}/>
                }
            </div>
        </div>
    );
};
