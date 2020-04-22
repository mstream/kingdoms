// @flow

import {
    generateIds,
} from '../utils';
import type {
    TestIds,
} from './types';

const ids: TestIds = {
    parent: ``,
};

export const testIds: TestIds = generateIds(
    {
        ids,
        prefix: `costInfo`,
    },
);
