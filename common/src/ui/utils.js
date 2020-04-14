// @flow


import type {
    ComponentKey,
} from './types';

export const createTestId = (
    {
        componentKey, id,
    }: { componentKey: ComponentKey, id: string },
) => {

    return `${ componentKey }/${ id }`;

};

