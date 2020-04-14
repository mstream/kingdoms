// @flow


import {
    createTestId,
} from './utils';

export const COMPONENT_COST_INFO: 'COMPONENT_COST_INFO' = `COMPONENT_COST_INFO`;

const createCostInfoTestId = (
    {
        id,
    }: { id: string },
) => {

    return createTestId(
        {
            componentKey: COMPONENT_COST_INFO,
            id,
        },
    );

};

export const testIds = {
    PARENT: createCostInfoTestId(
        {
            id: `parent`,
        },
    ),
};
