// @flow

import { createTestUsers } from './index';

describe('createTestUsers', () => {
    it('creates users', async () => {
        const config = {
            clientId: 'id1',
            password: 'password1',
            region: 'region1',
            userPoolId: 'pool1',
            usernames: [
                'user1',
                'user2',
            ],
        };

        const exec = jest.fn(() => Promise.resolve());

        await createTestUsers({ config, exec });

        expect(exec.mock.calls).toEqual([
            ['aws cognito-idp sign-up --region region1 --client-id id1 --username user1 --password password1'],
            ['aws cognito-idp sign-up --region region1 --client-id id1 --username user2 --password password1'],
            ['aws cognito-idp admin-confirm-sign-up --user-pool-id pool1 --username user1'],
            ['aws cognito-idp admin-confirm-sign-up --user-pool-id pool1 --username user2'],
        ]);
    });

    it('skips the user creation if already registered', async () => {
        const config = {
            clientId: 'id1',
            password: 'password1',
            region: 'region1',
            userPoolId: 'pool1',
            usernames: [
                'user1',
                'user2',
            ],
        };

        const exec = jest.fn((command: string) => {
            if (command.includes('aws cognito-idp sign-up') && command.includes('user1')) {
                return Promise.reject(Error('User already exists'));
            }
            return Promise.resolve();
        });

        await createTestUsers({ config, exec });

        expect(exec.mock.calls).toEqual([
            ['aws cognito-idp sign-up --region region1 --client-id id1 --username user1 --password password1'],
            ['aws cognito-idp sign-up --region region1 --client-id id1 --username user2 --password password1'],
            ['aws cognito-idp admin-confirm-sign-up --user-pool-id pool1 --username user2'],
        ]);
    });

    it('fails on sign up error', async () => {
        const config = {
            clientId: 'id1',
            password: 'password1',
            region: 'region1',
            userPoolId: 'pool1',
            usernames: [
                'user1',
                'user2',
            ],
        };

        const exec = jest.fn((command: string) => {
            if (command.includes('aws cognito-idp sign-up') && command.includes('user1')) {
                return Promise.reject(Error('unexpected error'));
            }
            return Promise.resolve();
        });

        const actualPromise = createTestUsers({ config, exec });

        await expect(actualPromise).rejects.toBeTruthy();


        expect(exec.mock.calls).toEqual([
            ['aws cognito-idp sign-up --region region1 --client-id id1 --username user1 --password password1'],
            ['aws cognito-idp sign-up --region region1 --client-id id1 --username user2 --password password1'],
        ]);
    });

    it('fails on confirm sign up error', async () => {
        const config = {
            clientId: 'id1',
            password: 'password1',
            region: 'region1',
            userPoolId: 'pool1',
            usernames: [
                'user1',
                'user2',
            ],
        };

        const exec = jest.fn((command: string) => {
            if (command.includes('aws cognito-idp admin-confirm-sign-up') && command.includes('user1')) {
                return Promise.reject(Error('unexpected error'));
            }
            return Promise.resolve();
        });

        const actualPromise = createTestUsers({ config, exec });

        await expect(actualPromise).rejects.toBeTruthy();

        expect(exec.mock.calls).toEqual([
            ['aws cognito-idp sign-up --region region1 --client-id id1 --username user1 --password password1'],
            ['aws cognito-idp sign-up --region region1 --client-id id1 --username user2 --password password1'],
            ['aws cognito-idp admin-confirm-sign-up --user-pool-id pool1 --username user1'],
            ['aws cognito-idp admin-confirm-sign-up --user-pool-id pool1 --username user2'],
        ]);
    });
});

