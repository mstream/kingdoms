// @flow

import AWS from 'aws-sdk';

type ApiGatewayPromise = () => Promise<void>;

type PostToConnection = ({ ConnectionId: string, Data: string }) => {
    promise: ApiGatewayPromise,
};

export type ApiGateway = {
    postToConnection: PostToConnection,
};

export const createApiGatewayClient = (): ApiGateway => {
    return new AWS.ApiGatewayManagementApi({
        apiVersion: '2018-11-29',
        endpoint: process.env.API_GATEWAY_ENDPOINT,
    });
};
