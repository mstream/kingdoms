// @flow

import {
    generateIds,
} from '../utils';
import type {
    TestIds,
} from './types';

const ids: TestIds = {
    cityList            : ``,
    parent              : ``,
    regimentTemplateForm: ``,
    schedulerForm       : ``,
};


export const testIds: TestIds = generateIds(
    {
        ids,
        prefix: `attackView`,
    },
);
