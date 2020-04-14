// @flow


import {
    createTestId,
} from './utils';

export const COMPONENT_CHANGE_INFO: 'COMPONENT_CHANGE_INFO' = `COMPONENT_CHANGE_INFO`;

const createChangeInfoTestId = (
    {
        id,
    }: { id: string },
) => {

    return createTestId(
        {
            componentKey: COMPONENT_CHANGE_INFO,
            id,
        },
    );

};

export const testIds = {
    PARENT: createChangeInfoTestId(
        {
            id: `parent`,
        },
    ),
};
