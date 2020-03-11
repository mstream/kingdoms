// @flow

import React from 'react';
import type { Props } from './props';
import classNames from 'classnames';
import type { ClientStateCityViewTab } from '../../state/state';
import {
    TAB_BUILDINGS,
    TAB_OVERVIEW,
    TAB_RESOURCES,
    TAB_UNITS,
} from '../../state/state';

const tabsOrder = [
    TAB_OVERVIEW,
    TAB_UNITS,
    TAB_RESOURCES,
    TAB_BUILDINGS,
];

const tabsVisuals = {
    [TAB_OVERVIEW]: {
        icon: 'icofont-info-square',
        name: 'Overview',
    },
    [TAB_UNITS]: {
        icon: 'icofont-people',
        name: 'Units',
    },
    [TAB_RESOURCES]: {
        icon: 'icofont-corn',
        name: 'Resources',
    },
    [TAB_BUILDINGS]: {
        icon: 'icofont-home',
        name: 'Buildings',
    },
};

export const testId = 'city-view-tabs';

export const Component = ({ activeTab, selectCityViewTab }: Props) => {

    const tabComponents = tabsOrder.map(
        (tab: ClientStateCityViewTab) => {
            const className = classNames(
                'py-1 px-2',
                {
                    'hover:bg-orange-600': tab !== activeTab,
                    'bg-orange-500': tab === activeTab,
                    'cursor-pointer': tab !== activeTab,
                    'cursor-default': tab === activeTab,
                },
            );

            const { icon, name } = tabsVisuals[tab];

            const iconClassName = `icofont ${icon}`;

            const onClick = (event) => {
                selectCityViewTab({ tab });
            };

            return (
                <div key={tab}
                     className={className}
                     role="tab"
                     onClick={onClick}
                >
                    <i className={iconClassName}/>
                    {name}
                </div>
            );
        },
    );

    return (
        <div
            data-testid={testId}
            className="flex flex-row flex-wrap justify-center w-full bg-orange-700 text-gray-100"
            role="tablist"
        >
            {tabComponents}
        </div>
    );
};
