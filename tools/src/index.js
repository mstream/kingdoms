// @flow

import { config } from './config';
import { createTestUsers } from './connector/auth';
import exec from 'await-exec';

createTestUsers({ config, exec })
    .then(() => {
        console.info('done');
        process.exit(0);
    })
    .catch((error) => {
        console.error(`error: ${error.message}`);
        process.exit(1);
    });
