// @flow

import { createRedisClient } from '../../clients/redis';
import { createApiGatewayClient } from '../../clients/api-gateway';
import { executeAction, sendResponse } from '../../util';
import { parseJson } from '../../../../common/src/util';
import type { ProxyHandler } from '../types';
import { getState } from '../../connectors/database';
import type { ServerResponse } from '../../../../common/src/types';
import { CommonPlayerActionType } from '../../../../common/src/types';
import { validateCommonStateType } from '../../../../common/src/validators';
import { config } from '../../config';
import type { CommonPlayerAction } from '../../../../common/src/state/types';
import { GET_CURRENT_STATE } from '../../../../common/src/state/actions/types';
import {
    CHANGE_CITY_NAME,
    CREATE_CITY,
    UPGRADE_BUILDING,
} from '../../../../common/src/state/modules/cities/actions/types';
import { CREATE_ORDER } from '../../../../common/src/state/modules/orders/actions/types';

const apiGateway = createApiGatewayClient();
const redis = createRedisClient({ config });

const requestAccepted = { statusCode: 200, body: `Request accepted.` };

const requestAuthorizationError = {
    statusCode: 400,
    body: `Request not accepted.`,
};

const requestExecutionError = {
    statusCode: 500,
    body: `Request processing error.`,
};

const extractActionFromBody = ({ bodyString }: { bodyString: ?string }): ?CommonPlayerAction => {
    if (bodyString == null) {
        console.error(`invalid api gateway body received`);
        return null;
    }
    console.info(`received body string: ${bodyString}`);
    const body = parseJson({ json: bodyString });

    if (typeof body !== `object` || body == null || body.data == null || typeof body.data !== `object`) {
        console.error(`invalid api gateway body received`);
        return null;
    }

    try {
        return CommonPlayerActionType.assert(body.data);
    } catch (error) {
        console.info(error.message);
        return null;
    }
};

export const handler: ProxyHandler = async (event, context) => {
    const { authorizer, connectionId } = event.requestContext;

    if (authorizer == null) {
        console.error(`authorizer is missing`);
        return requestExecutionError;
    }

    if (connectionId == null) {
        console.error(`connectionId is missing`);
        return requestExecutionError;
    }

    const username = authorizer.principalId;

    if (username == null || typeof username !== `string`) {
        console.error(`username is missing`);
        return requestExecutionError;
    }

    try {
        const action = extractActionFromBody({ bodyString: event.body });

        if (action == null) {
            return requestExecutionError;
        }

        const { playerId } = action.payload;

        if (playerId !== username) {
            console.warn(`username '${username}' does not match the playerId '${playerId}'`);
            return requestAuthorizationError;
        }

        const sendResponseBackToClient = async ({ response }: { response: ServerResponse }) => await sendResponse({
            apiGateway,
            connectionId,
            redis,
            response,
        });

        // TODO action authorization

        switch (action.type) {
            case GET_CURRENT_STATE: {
                const state = await getState({
                    environment: config.environment,
                    redis,
                    validateState: validateCommonStateType,
                });
                await sendResponseBackToClient({
                    response: {
                        errors: [],
                        request: action,
                        state,
                    },
                });
                return requestAccepted;
            }
            case UPGRADE_BUILDING:
            case CHANGE_CITY_NAME:
            case CREATE_CITY:
            case CREATE_ORDER: {
                const response = await executeAction({
                    action,
                    environment: config.environment,
                    redis,
                });
                await sendResponseBackToClient({ response });
                return requestAccepted;
            }
            default: {
                console.error(`unsupported request type: ${action.type}`);
                const state = await getState({
                    environment: config.environment,
                    redis,
                    validateState: validateCommonStateType,
                });
                await sendResponseBackToClient({
                    response: {
                        errors: [`unsupported action`],
                        request: action,
                        state: state,
                    },
                });
                return requestAuthorizationError;
            }
        }
    } catch (error) {
        console.info(error.stack);
        return requestExecutionError;
    }
};
