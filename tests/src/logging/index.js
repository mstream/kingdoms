// @flow

import {
    config,
} from '../config';
import {
    createLogger,
} from '../../../common/src/logging';

export const logger = createLogger(
    {
        config,
    },
);
