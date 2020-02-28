/**
 * @flow
 */

import type {APIGatewayProxyHandler} from '../../types';

const generatePolicy = ({principalId, effect, resource}: { principalId: string, effect: string, resource: string }) => {
    return {
        principalId,
        policyDocument: {
            Version: '2012-10-17',
            Statement: [
                {
                    Action: 'execute-api:Invoke',
                    Effect: effect,
                    Resource: resource,
                }
            ]
        }
    };
};

export const handler: APIGatewayProxyHandler = async (event, context) => {
    const methodArn = event.methodArn;
    const token = event.queryStringParameters.token;

    if (token != null && token === 'validToken') {
        context.succeed(
            generatePolicy({
                effect: 'Allow',
                principalId: 'user',
                resource: methodArn
            })
        );
    } else {
        context.fail('Unauthorized');
    }
};
