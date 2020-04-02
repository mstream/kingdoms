// @flow

import type { CustomAuthorizerHandler, CustomAuthorizerResult } from '../types';
import { buildUserProfile } from '../../jwt';
import { createCognitoClient } from '../../clients/cognito';
import { config } from '../../config';
import type { UserProfileResult } from '../../jwt/types';

const createAllowPolicy = ({
    methodArn,
    username,
}: {
    methodArn: string,
    username: string,
}): CustomAuthorizerResult => {
    return {
        principalId: username,
        policyDocument: {
            Version: `2012-10-17`,
            Statement: [
                {
                    Action: `execute-api:Invoke`,
                    Effect: `Allow`,
                    Resource: methodArn,
                },
            ],
        },
    };
};

const unauthorizedError = Error(`Unauthorized`);

const cognito = createCognitoClient({ config });

export const handler: CustomAuthorizerHandler = async (event, context) => {
    const queryParams = event.queryStringParameters;

    if (queryParams == null || queryParams.token == null) {
        console.info(`authentication failed - no token provided`);
        throw unauthorizedError;
    }

    const { token } = queryParams;

    console.info(`received token: ${token}`);

    const userProfileResult: UserProfileResult = await buildUserProfile({
        cognito,
        token,
    });

    if (userProfileResult.errors.length > 0) {
        console.info(
            `authentication failed: ${JSON.stringify(
                userProfileResult.errors,
            )}`,
        );
        throw unauthorizedError;
    }

    if (userProfileResult.userProfile == null) {
        const errorMessage = `missing user profile`;
        console.error(errorMessage);
        throw Error(`missing user profile`);
    }

    return createAllowPolicy({
        methodArn: event.methodArn,
        username: userProfileResult.userProfile.name,
    });
};
