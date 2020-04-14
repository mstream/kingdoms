// @flow

import React from 'react';
import type {
    Props,
} from './props';
import classNames from 'classnames';
import type {
    ClientStateCityViewTab,
} from '../../../state/modules/_children/menu/reducer/types';
import {
    TAB_BUILDINGS,
    TAB_ORDERS,
    TAB_OVERVIEW,
    TAB_RESOURCES,
    TAB_UNITS,
} from '../../../state/modules/_children/menu/reducer/types';
import {
    testIds,
} from '../../../../../common/src/ui';

const tabsOrder = [
    TAB_OVERVIEW,
    TAB_UNITS,
    TAB_RESOURCES,
    TAB_BUILDINGS,
    TAB_ORDERS,
];

const tabsVisuals = {
    [ TAB_BUILDINGS ]: {
        icon: `icofont-home`,
        name: `Buildings`,
    },
    [ TAB_ORDERS ]: {
        icon: `icofont-direction-sign`,
        name: `Orders`,
    },
    [ TAB_OVERVIEW ]: {
        icon: `icofont-info-square`,
        name: `Overview`,
    },
    [ TAB_RESOURCES ]: {
        icon: `icofont-corn`,
        name: `Resources`,
    },
    [ TAB_UNITS ]: {
        icon: `icofont-people`,
        name: `Units`,
    },
};

export const Component = (
    {
        activeTab, selectCityViewTab,
    }: Props,
) => {

    const tabComponents = tabsOrder.map(
        (
            tab: ClientStateCityViewTab,
        ) => {

            const className = classNames(
                `py-1 px-2`,
                {
                    'bg-orange-500'               : tab === activeTab,
                    'cursor-default'              : tab === activeTab,
                    'cursor-pointer'              : tab !== activeTab,
                    'hover:bg-orange-500-alpha-50': tab !== activeTab,
                },
            );

            const {
                icon, name,
            } = tabsVisuals[ tab ];

            const iconClassName = `icofont ${ icon }`;

            const onClick = () => {

                selectCityViewTab(
                    {
                        tab,
                    },
                );

            };

            return (
                <div key={tab} className={className} role="tab"
                    onClick={onClick}>
                    <i className={iconClassName}/>
                    {name}
                </div>
            );

        },
    );

    return (
        <div
            data-testid={testIds.COMPONENT_CITY_VIEW.VIEW_TABS}
            className="wood-bg flex flex-row flex-wrap justify-center w-full bg-orange-700 text-gray-100"
            role="tablist"
        >
            {tabComponents}
        </div>
    );

};
