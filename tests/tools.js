// @flow

import {
    createTools,
} from '../tools/src';
import {
    config,
} from './config';
import {
    logger,
} from './logging';

export const tools = createTools(
    {
        config,
        logger,
    },
);
