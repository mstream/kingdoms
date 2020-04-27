// @flow

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
import React from 'react';
import classNames from 'classnames';
import type {
    ClientStateCityViewTab,
} from '../../../state/modules/_children/menu/reducer/types';
import type {
    Props,
} from './props';

const tabsOrder = [
    TAB_OVERVIEW,
    TAB_UNITS,
    TAB_RESOURCES,
    TAB_BUILDINGS,
    TAB_ORDERS,
];

const tabModels = {
    [ TAB_BUILDINGS ]: {
        icon  : `icofont-home`,
        name  : `Buildings`,
        testId: testIds.cityView.buildingsTab,
    },
    [ TAB_ORDERS ]: {
        icon  : `icofont-direction-sign`,
        name  : `Orders`,
        testId: testIds.cityView.ordersTab,
    },
    [ TAB_OVERVIEW ]: {
        icon  : `icofont-info-square`,
        name  : `Overview`,
        testId: testIds.cityView.overviewTab,
    },
    [ TAB_RESOURCES ]: {
        icon  : `icofont-corn`,
        name  : `Resources`,
        testId: testIds.cityView.resourcesTab,
    },
    [ TAB_UNITS ]: {
        icon  : `icofont-people`,
        name  : `Units`,
        testId: testIds.cityView.unitsTab,
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
                icon, name, testId,
            } = tabModels[ tab ];

            const iconClassName = `icofont ${ icon }`;

            const onClick = () => {

                selectCityViewTab(
                    {
                        tab,
                    },
                );

            };

            return (
                <div data-testid={testId}
                    key={tab}
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
            data-testid={testIds.cityView.viewTabs}
            className={classNames(
                `wood-bg`,
                `flex`,
                `flex-row`,
                `flex-wrap`,
                `justify-center`,
                `w-full`,
                `bg-orange-700`,
                `text-gray-100`,
            )}
            role="tablist"
        >
            {tabComponents}
        </div>
    );

};
