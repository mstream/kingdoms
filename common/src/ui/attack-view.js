// @flow


import {
    createTestId,
} from './utils';

export const COMPONENT_ATTACK_VIEW: 'COMPONENT_ATTACK_VIEW' = `COMPONENT_ATTACK_VIEW`;

const createAttackViewTestId = (
    {
        id,
    }: { id: string },
) => {

    return createTestId(
        {
            componentKey: COMPONENT_ATTACK_VIEW,
            id,
        },
    );

};

export const testIds = {
    CITY_LIST: createAttackViewTestId(
        {
            id: `city-list`,
        },
    ),
    PARENT: createAttackViewTestId(
        {
            id: `parent`,
        },
    ),
    REGIMENT_TEMPLATE_FORM: createAttackViewTestId(
        {
            id: `regiment-template-form`,
        },
    ),
    SCHEDULER_FORM: createAttackViewTestId(
        {
            id: `scheduler-form`,
        },
    ),
};
