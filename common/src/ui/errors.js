// @flow


import {
    createTestId,
} from './utils';

export const COMPONENT_ERRORS: 'COMPONENT_ERRORS' = `COMPONENT_ERRORS`;

const createErrorsTestId = (
    {
        id,
    }: { id: string },
) => {

    return createTestId(
        {
            componentKey: COMPONENT_ERRORS,
            id,
        },
    );

};

export const testIds = {
    PARENT: createErrorsTestId(
        {
            id: `parent`,
        },
    ),
};
