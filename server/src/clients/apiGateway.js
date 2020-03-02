// @flow

import AWS from 'aws-sdk';

export type ApiGateway = mixed;

export const createApiGatewayClient = () => {
    return new AWS.ApiGatewayManagementApi({
        apiVersion: '2018-11-29',
        endpoint: process.env.API_GATEWAY_ENDPOINT,
    });
};
