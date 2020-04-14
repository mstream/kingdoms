// @flow


import {
    createTestId,
} from './utils';

export const COMPONENT_MENU: 'COMPONENT_MENU' = `COMPONENT_MENU`;

const createMenuTestId = (
    {
        id,
    }: { id: string },
) => {

    return createTestId(
        {
            componentKey: COMPONENT_MENU,
            id,
        },
    );

};

export const testIds = {
    DROPDOWN_BUTTON: createMenuTestId(
        {
            id: `dropdown-button`,
        },
    ),
    PARENT: createMenuTestId(
        {
            id: `parent`,
        },
    ),
    SIGN_OUT_BUTTON: createMenuTestId(
        {
            id: `sign-out-button`,
        },
    ),
};
