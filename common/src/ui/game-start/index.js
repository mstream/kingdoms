// @flow

import {
    generateIds,
} from '../utils';
import type {
    TestIds,
} from './types';

const ids: TestIds = {
    cityNameInput   : ``,
    createCityButton: ``,
    parent          : ``,
};

export const testIds: TestIds = generateIds(
    {
        ids,
        prefix: `gameStart`,
    },
);
