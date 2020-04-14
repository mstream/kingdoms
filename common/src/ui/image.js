// @flow


import {
    createTestId,
} from './utils';

export const COMPONENT_IMAGE: 'COMPONENT_IMAGE' = `COMPONENT_IMAGE`;

const createImageTestId = (
    {
        id,
    }: { id: string },
) => {

    return createTestId(
        {
            componentKey: COMPONENT_IMAGE,
            id,
        },
    );

};


export const testIds = {
    PARENT: createImageTestId(
        {
            id: `parent`,
        },
    ),
};
