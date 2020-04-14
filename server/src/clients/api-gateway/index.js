// @flow

import AWS from 'aws-sdk';
import type {
    ApiGateway, MockPostToConnection,
} from './types';
import type {
    Config,
} from '../../config/types';

// $FlowFixMe
export const mockPostToConnection: MockPostToConnection = null;

export const createApiGatewayClient = (
    {
        config,
    }: {
        config: Config,
    },
): ApiGateway => {

    return new AWS.ApiGatewayManagementApi(
        {
            apiVersion: `2018-11-29`,
            endpoint  : config.apiGateway.endpoint,
        },
    );

};
