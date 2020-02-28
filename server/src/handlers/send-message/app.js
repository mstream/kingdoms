/**
 * @flow
 */

import {createRedisClient} from '../../services/redis';
import {createApiGatewayClient} from '../../services/apiGateway';
import {executeAction, sendResponse} from '../../utils';
import type {
    ServerRequest,
    ServerResponse
} from '../../../../common/src/actions';
import {ServerRequestType} from '../../../../common/src/actions';
import {parseJson} from '../../../../common/src/util';
import type {ProxyHandler} from '../../types';

const apiGateway = createApiGatewayClient();
const redis = createRedisClient();

const requestExecutionError = {statusCode: 500, body: 'Message send error.'};
const requestAccepted = {statusCode: 200, body: 'Request accepted.'};

const extractRequestFromBody = ({bodyString}: { bodyString: ?string }): ?ServerRequest => {
    if (bodyString == null) {
        console.error('invalid api gateway body received');
        return null;
    }
    console.log(`received body string: ${bodyString}`);
    const body = parseJson({json: bodyString});

    if (typeof body !== 'object' || body == null || body.data == null || typeof body.data !== 'object') {
        console.error('invalid api gateway body received');
        return null;
    }

    try {
        return ServerRequestType.assert(body.data);
    } catch (error) {
        console.log(error.message);
        return null;
    }
};

export const handler: ProxyHandler = async (event, context) => {
    const {authorizer, connectionId} = event.requestContext;

    if (authorizer == null) {
        console.error('authorizer is missing');
        return requestExecutionError;
    }

    if (connectionId == null) {
        console.error('connectionId is missing');
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

        // TODO action authorization

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
            case 'UPGRADE_BUILDING':
            case 'CHANGE_CITY_NAME': {
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
