// @flow

import type { Config } from './types';

const createConfig = (): Config => {
    if (CLIENT_ID == null) {
        throw Error('CLIENT_ID required');
    }

    if (USER_POOL_ID == null) {
        throw Error('USER_POOL_ID required');
    }

    return {
        clientId: CLIENT_ID,
        password: 'Test_123',
        region: 'eu-west-1',
        userPoolId: USER_POOL_ID,
        usernames: ['test1', 'test2', 'test3'],
    };
};

export const config: Config = createConfig();
