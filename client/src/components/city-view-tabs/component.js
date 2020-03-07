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
        name: 'Overview',
    },
    [TAB_UNITS]: {
        name: 'Units',
    },
    [TAB_RESOURCES]: {
        name: 'Resources',
    },
    [TAB_BUILDINGS]: {
        name: 'Buildings',
    },
};

export const Component = ({ activeTab, selectCityViewTab }: Props) => {

    const tabComponents = tabsOrder.map(
        (tab: ClientStateCityViewTab) => {
            const className = classNames(
                'py-1 px-2 cursor-pointer',
                {
                    'hover:bg-orange-600': tab !== activeTab,
                    'bg-orange-500': tab === activeTab,
                },
            );

            const onClick = (event) => {
                selectCityViewTab({ tab });
            };

            return (
                <div key={tab}
                     className={className}
                     onClick={onClick}
                >
                    {tabsVisuals[tab].name}
                </div>
            );
        },
    );

    return (
        <div
            className="flex flex-row flex-wrap justify-center w-full bg-orange-700 text-gray-100">
            {tabComponents}
        </div>
    );
};
