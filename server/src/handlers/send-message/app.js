/**
 * @flow
 */

import type {APIGatewayProxyHandler} from '../../types';
import {createRedisClient} from '../../services/redis';
import {createApiGatewayClient} from '../../services/apiGateway';
import {executeAction, sendResponse} from '../../utils';
import type {
    ServerRequest,
    ServerResponse
} from '../../../../common/src/actions';


const apiGateway = createApiGatewayClient();
const redis = createRedisClient();

const requestExecutionError = {statusCode: 500, body: 'Message send error.'};
const requestAccepted = {statusCode: 200, body: 'Request accepted.'};

const extractRequestFromBody = ({bodyString}: { bodyString: ?string }): ?ServerRequest => {
    if (bodyString == null) {
        console.error('invalid api gateway body received');
        return null;
    }
    const body = JSON.parse(bodyString);
    if (body.data == null || typeof body.data !== 'object') {
        console.error('invalid api gateway body received');
        return null;
    }
    const request = body.data;
    if (request == null || typeof request !== 'object') {
        console.error('invalid request received');
        return null;
    }
    if (request.type == null || typeof request.type !== 'string') {
        console.error('invalid request type received');
        return null;
    }
    return request;
};

export const handler: APIGatewayProxyHandler = async (event, context) => {
    const {connectionId} = event.requestContext;
    if (connectionId == null) {
        console.error('state is not initialized');
        return requestExecutionError;
    }
    try {
        const request = extractRequestFromBody({bodyString: event.body});

        if (request == null) {
            return requestExecutionError;
        }

        const sendResponseBackToClient = async ({response}: { response: ServerResponse }) => await sendResponse({
            apiGateway,
            connectionId,
            redis,
            response,
        });

        // request validation

        switch (request.type) {
            case 'GET_CURRENT_STATE': {
                await sendResponseBackToClient({
                    response: {
                        errors: [],
                        request,
                        state: JSON.parse(await redis.get('state')),
                    }
                });
                return requestAccepted;
            }
            case 'UPGRADE_BUILDING': {
                const response = await executeAction({action: request, redis});
                await sendResponseBackToClient({response});
                return requestAccepted;
            }
            default: {
                console.error(`unsupported request type: ${request.type}`);
                return {statusCode: 400, body: 'Request rejected.'};
            }
        }
    } catch (error) {
        console.log(error.stack);
        return requestExecutionError;
    }
};
