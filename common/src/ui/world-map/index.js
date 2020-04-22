// @flow

import {
    generateIds,
} from '../utils';
import type {
    TestIds,
} from './types';

const ids: TestIds = {
    cityTile   : ``,
    parent     : ``,
    statusBar  : ``,
    terrainTile: ``,
};

export const testIds: TestIds = generateIds(
    {
        ids,
        prefix: `worldMap`,
    },
);
