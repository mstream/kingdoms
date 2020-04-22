// @flow

import {
    generateIds,
} from '../utils';
import type {
    TestIds,
} from './types';

const ids: TestIds = {
    parent                : ``,
    signOutButton         : ``,
    userMenuDropdownButton: ``,
};

export const testIds: TestIds = generateIds(
    {
        ids,
        prefix: `menu`,
    },
);
