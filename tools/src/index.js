// @flow

import exec from 'await-exec';
import { config } from './config';

const createTestUsers = async () => {
    const signUpPromises = config.users.map(
        (username) => {
            const options = `--region ${config.region} --client-id ${config.clientId} --username ${username} --password ${config.password}`;
            return exec(`aws cognito-idp sign-up ${options}`);
        },
    );

    await Promise.all(signUpPromises);

    const confirmPromises = config.users.map(
        (username) => {
            const options = `--user-pool-id ${config.userPoolId} --username ${username}`;
            return exec(`aws cognito-idp admin-confirm-sign-up ${options}`);
        },
    );

    await Promise.all(confirmPromises);
};

createTestUsers()
    .then(
        () => {
            console.info('done');
        },
    )
    .catch(
        (error) => {
            throw error;
        },
    );