// @flow


import {
    createTestId,
} from './utils';

export const COMPONENT_WORLD_MAP: 'COMPONENT_WORLD_MAP' = `COMPONENT_WORLD_MAP`;

const createWorldMapTestId = (
    {
        id,
    }: { id: string },
) => {

    return createTestId(
        {
            componentKey: COMPONENT_WORLD_MAP,
            id,
        },
    );

};

export const testIds = {
    CITY_TILE: createWorldMapTestId(
        {
            id: `city-tile`,
        },
    ),
    PARENT: createWorldMapTestId(
        {
            id: `parent`,
        },
    ),
    STATUS_BAR: createWorldMapTestId(
        {
            id: `status-bar`,
        },
    ),
    TERRAIN_TILE: createWorldMapTestId(
        {
            id: `terrain-tile`,
        },
    ),
};
