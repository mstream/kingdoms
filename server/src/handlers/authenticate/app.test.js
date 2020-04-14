// @flow

import {
    mockBuildUserProfile,
} from '../../jwt';
import {
    mockGetJwks,
} from '../../clients/cognito';
import {
    emptyContext, emptyCustomAuthorizerEvent,
} from '../util';
import type {
    Context, CustomAuthorizerEvent,
} from '../types';
import {
    handler,
} from './app';

jest.mock(
    `../../jwt`,
);

jest.mock(
    `../../clients/cognito`,
);

jest.mock(
    `../../config`,
);

describe(
    `authenticateHandler`,
    () => {

        it(
            ``,
            async () => {

                const context: Context = {
                    ...emptyContext,
                };

                const callback = () => {

                    return undefined;

                };

                const event: CustomAuthorizerEvent = {
                    ...emptyCustomAuthorizerEvent,
                    methodArn            : `methodArn`,
                    queryStringParameters: {
                        token: `token`,
                    },
                };

                mockGetJwks.mockImplementation(
                    () => {

                        return Promise.resolve(
                            {
                                keys: [
                                    {
                                        alg: ``,
                                        e  : ``,
                                        kid: `key1`,
                                        kty: ``,
                                        n  : `publicKey1`,
                                        use: ``,
                                    },
                                    {
                                        alg: ``,
                                        e  : ``,
                                        kid: `key2`,
                                        kty: ``,
                                        n  : `publicKey2`,
                                        use: ``,
                                    },
                                ],
                            },
                        );

                    },
                );

                mockBuildUserProfile.mockImplementation(
                    () => {

                        return Promise.resolve(
                            {
                                errors     : [],
                                userProfile: {
                                    name: `user1`,
                                },
                            },
                        );

                    },
                );

                const expected = {
                    policyDocument: {
                        Statement: [
                            {
                                Action  : `execute-api:Invoke`,
                                Effect  : `Allow`,
                                Resource: `methodArn`,
                            },
                        ],
                        Version: `2012-10-17`,
                    },
                    principalId: `user1`,
                };

                const actual = await handler(
                    event,
                    context,
                    callback,
                );

                expect(
                    actual,
                )
                    .toEqual(
                        expected,
                    );

            },
        );

    },
);
