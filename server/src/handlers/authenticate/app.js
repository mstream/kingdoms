// @flow

import type { CustomAuthorizerHandler } from '../types';

const createAllowPolicy = ({ methodArn }: { methodArn: string }) => {
    return {
        principalId: `user`,
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

export const handler: CustomAuthorizerHandler = async (event, context) => {
    const queryParams = event.queryStringParameters;

    if (queryParams != null && queryParams.token != null) {
        console.info(`authentication token: ${queryParams.token}`);
        return createAllowPolicy({ methodArn: event.methodArn });
    } else {
        throw Error(`Unauthorized`);
    }
};
