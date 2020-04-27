// @flow

import {
    generateIds,
} from '../utils';
import type {
    TestIds,
} from './types';

const ids: TestIds = {
    background         : ``,
    buildingsPanel     : ``,
    buildingsTab       : ``,
    header             : ``,
    itemsList          : ``,
    name               : ``,
    nextCityButton     : ``,
    ordersPanel        : ``,
    ordersTab          : ``,
    overviewPanel      : ``,
    overviewTab        : ``,
    parent             : ``,
    previousCityButton : ``,
    resourcesPanel     : ``,
    resourcesTab       : ``,
    scheduledAttackInfo: ``,
    scheduledAttackItem: ``,
    unitsPanel         : ``,
    unitsTab           : ``,
    viewTabs           : ``,
};

export const testIds: TestIds = generateIds(
    {
        ids,
        prefix: `cityView`,
    },
);
