// @flow


import {
    createTestId,
} from './utils';

export const COMPONENT_LOADER: 'COMPONENT_LOADER' = `COMPONENT_LOADER`;

const createLoaderTestId = (
    {
        id,
    }: { id: string },
) => {

    return createTestId(
        {
            componentKey: COMPONENT_LOADER,
            id,
        },
    );

};

export const testIds = {
    PARENT: createLoaderTestId(
        {
            id: `parent`,
        },
    ),
};
