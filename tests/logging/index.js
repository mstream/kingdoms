// @flow

import {
    createLogger,
} from '../../common/src/logging';
import {
    config,
} from '../config';

export const logger = createLogger(
    {
        config,
    },
);
