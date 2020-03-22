// @flow

import type { CustomAuthorizerHandler, CustomAuthorizerResult } from '../types';

const createAllowPolicy = ({ methodArn }: { methodArn: string }): CustomAuthorizerResult  => {
    return {
        principalId: `user`,
        policyDocument: {
            Version: `2012-10-17`,
            // $FlowFixMe
            Statement: [
                // $FlowFixMe
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
