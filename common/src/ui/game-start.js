// @flow


import {
    createTestId,
} from './utils';

export const COMPONENT_GAME_START: 'COMPONENT_GAME_START' = `COMPONENT_GAME_START`;

const createGameStartTestId = (
    {
        id,
    }: { id: string },
) => {

    return createTestId(
        {
            componentKey: COMPONENT_GAME_START,
            id,
        },
    );

};

export const testIds = {
    CITY_CREATE_BUTTON: createGameStartTestId(
        {
            id: `city-create-button`,
        },
    ),
    CITY_NAME_INPUT: createGameStartTestId(
        {
            id: `city-name-input`,
        },
    ),
    PARENT: createGameStartTestId(
        {
            id: `parent`,
        },
    ),
};
