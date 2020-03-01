// @flow

import type {CustomAuthorizerHandler} from '../../types';

export const handler: CustomAuthorizerHandler = async (event, context) => {
    const queryParams = event.queryStringParameters;

    if (queryParams != null && queryParams.token != null) {
        console.log(`authentication token: ${queryParams.token}`);

        return {
            principalId: 'user',
            policyDocument: {
                Version: '2012-10-17',
                Statement: [
                    {
                        Action: 'execute-api:Invoke',
                        Effect: 'Allow',
                        Resource: event.methodArn,
                    }
                ]
            }
        };
    } else {
        throw Error('Unauthorized');
    }
};
