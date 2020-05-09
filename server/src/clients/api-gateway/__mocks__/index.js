// @flow

import type {
    MockPostToConnection,
    WebSocketApiGateway,
} from '../types';

export const mockPostToConnection: MockPostToConnection = jest.fn(
    () => {

        return {
            promise: () => {

                return Promise.reject(
                    Error(
                        `mockPostToConnection`,
                    ),
                );

            },
        };

    },
);

export const createApiGatewayClient: () => WebSocketApiGateway = () => {

    return {
        postToConnection: mockPostToConnection,
    };

};
