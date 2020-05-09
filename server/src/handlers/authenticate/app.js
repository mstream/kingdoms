// @flow

import {
    ERROR_UNAUTHORIZED,
} from '../../../../common/src/errors/types';
import {
    buildUserProfile,
} from '../../jwt';
import {
    createCognitoClient,
} from '../../clients/cognito';
import {
    createConfig,
} from '../../config';
import {
    createLogger,
} from '../../../../common/src/logging';
import {
    errorCreators, tryCatch,
} from '../../../../common/src/errors';
import type {
    CustomAuthorizerHandler,
    CustomAuthorizerResult,
} from '../types';
import type {
    UserProfileResult,
} from '../../jwt/types';


const createAllowPolicy = (
    {
        methodArn,
        username,
    }: $ReadOnly< {|
        methodArn: string,
        username: string,
    |} >,
): CustomAuthorizerResult => {

    return {
        policyDocument: {
            Statement: [
                {
                    Action  : `execute-api:Invoke`,
                    Effect  : `Allow`,
                    Resource: methodArn,
                },
            ],
            Version: `2012-10-17`,
        },
        principalId: username,
    };

};

const config = createConfig();

const logger = createLogger(
    {
        config,
    },
);

const cognito = createCognitoClient(
    {
        config,
        logger,
    },
);


export const handler: CustomAuthorizerHandler
    = async ( event, ) => {

        const expectedErrorNames = [
            ERROR_UNAUTHORIZED,
        ];

        const execution = async () => {

            const queryParams = event.queryStringParameters;

            if ( queryParams == null || queryParams.token == null ) {

                const errorMessage = `no token provided`;

                logger.warn(
                    {
                        message: errorMessage,

                    },
                );

                throw errorCreators.unauthorized(
                    {
                        message: errorMessage,
                    },
                );

            }

            const {
                token,
            } = queryParams;

            logger.debug(
                {
                    interpolationValues: [
                        token,
                    ],
                    message: `received token: %s`,
                },
            );

            const userProfileResult: UserProfileResult
                = await buildUserProfile(
                    {
                        cognito,
                        token,
                    },
                );

            if ( userProfileResult.errors.length > 0 ) {

                logger.warn(
                    {
                        interpolationValues: [
                            userProfileResult.errors,
                        ],
                        message: `authentication failed: %o`,
                    },
                );

                throw errorCreators.unauthorized(
                    {
                        message: `authentication failed`,
                    },
                );

            }

            if ( userProfileResult.userProfile == null ) {

                throw errorCreators.unexpected(
                    {
                        message: `missing user profile`,
                    },
                );

            }

            return createAllowPolicy(
                {
                    methodArn: event.methodArn,
                    username : userProfileResult.userProfile.name,
                },
            );

        };

        return await tryCatch(
            {
                execution,
                expectedErrorNames,
            },
        );

    };
