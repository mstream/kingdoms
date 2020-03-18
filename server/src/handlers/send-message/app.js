// @flow

import {createRedisClient} from '../../clients/redis';
import {createApiGatewayClient} from '../../clients/api-gateway';
import {executeAction, sendResponse} from '../../util';
import {parseJson} from '../../../../common/src/util';
import type {ProxyHandler} from '../types';
import {getState} from '../../connectors/database';
import type {
    ServerRequest,
    ServerResponse,
} from '../../../../common/src/types';
import { ServerRequestType } from '../../../../common/src/types';

const apiGateway = createApiGatewayClient();
const redis = createRedisClient();

const requestExecutionError = {statusCode: 500, body: 'Message send error.'};
const requestAccepted = {statusCode: 200, body: 'Request accepted.'};

const extractRequestFromBody = ({bodyString}: { bodyString: ?string }): ?ServerRequest => {
    if (bodyString == null) {
        console.error('invalid api gateway body received');
        return null;
    }
    console.info(`received body string: ${bodyString}`);
    const body = parseJson({json: bodyString});

    if (typeof body !== 'object' || body == null || body.data == null || typeof body.data !== 'object') {
        console.error('invalid api gateway body received');
        return null;
    }

    try {
        return ServerRequestType.assert(body.data);
    } catch (error) {
        console.info(error.message);
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
                const state = await getState({redis});
                await sendResponseBackToClient({
                    response: {
                        errors: [],
                        request,
                        state,
                    }
                });
                return requestAccepted;
            }
            case 'UPGRADE_BUILDING':
            case 'CHANGE_CITY_NAME':
            case 'CREATE_CITY': {
                const response = await executeAction({action: request, redis});
                await sendResponseBackToClient({response});
                return requestAccepted;
            }
            default: {
                console.error(`unsupported request type: ${request.type}`);
                const state = await getState({redis});
                await sendResponseBackToClient({
                    response: {
                        errors: ['unsupported action'],
                        request,
                        state: state,
                    }
                });
                return {statusCode: 400, body: 'Request rejected.'};
            }
        }
    } catch (error) {
        console.info(error.stack);
        return requestExecutionError;
    }
};
