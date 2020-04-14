// @flow


import {
    createTestId,
} from './utils';

export const COMPONENT_APP: 'COMPONENT_APP' = `COMPONENT_APP`;

const createAppTestId = (
    {
        id,
    }: { id: string },
) => {

    return createTestId(
        {
            componentKey: COMPONENT_APP,
            id,
        },
    );

};

export const testIds = {
    PARENT: createAppTestId(
        {
            id: `parent`,
        },
    ),
};
