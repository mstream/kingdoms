// @flow

import {
    config,
} from './config';
import {
    createTools,
} from '../tools/src';
import {
    logger,
} from './logging';

export const tools = createTools(
    {
        config,
        logger,
    },
);
