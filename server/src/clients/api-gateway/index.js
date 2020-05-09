// @flow

import AWS from 'aws-sdk';
import type {
    Config,
} from '../../config/types';
import type {
    MockPostToConnection,
    WebSocketApiGateway,
} from './types';

// $FlowFixMe
export const mockPostToConnection: MockPostToConnection = null;

export const createApiGatewayClient = (
    {
        config,
    }: {
        config: Config,
    },
): WebSocketApiGateway => {

    return new AWS.ApiGatewayManagementApi(
        {
            apiVersion: `2018-11-29`,
            endpoint  : config.webSocketApiGateway.endpoint,
        },
    );

};
