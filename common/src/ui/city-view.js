// @flow


import {
    createTestId,
} from './utils';

export const COMPONENT_CITY_VIEW: 'COMPONENT_CITY_VIEW' = `COMPONENT_CITY_VIEW`;

const createCityViewTestId = (
    {
        id,
    }: { id: string },
) => {

    return createTestId(
        {
            componentKey: COMPONENT_CITY_VIEW,
            id,
        },
    );

};

export const testIds = {
    BACKGROUND: createCityViewTestId(
        {
            id: `background`,
        },
    ),
    BUILDINGS: createCityViewTestId(
        {
            id: `buildings`,
        },
    ),
    HEADER: createCityViewTestId(
        {
            id: `header`,
        },
    ),
    ITEMS_LIST: createCityViewTestId(
        {
            id: `items-list`,
        },
    ),
    ORDERS: createCityViewTestId(
        {
            id: `orders`,
        },
    ),
    OVERVIEW: createCityViewTestId(
        {
            id: `overview`,
        },
    ),
    PARENT: createCityViewTestId(
        {
            id: `parent`,
        },
    ),
    RESOURCES: createCityViewTestId(
        {
            id: `resources`,
        },
    ),
    SCHEDULED_ATTACK_INFO: createCityViewTestId(
        {
            id: `scheduled-attack-info`,
        },
    ),
    SCHEDULED_ATTACK_ITEM: createCityViewTestId(
        {
            id: `scheduled-attack-item`,
        },
    ),
    UNITS: createCityViewTestId(
        {
            id: `units`,
        },
    ),
    VIEW_TABS: createCityViewTestId(
        {
            id: `view-tabs`,
        },
    ),
};
