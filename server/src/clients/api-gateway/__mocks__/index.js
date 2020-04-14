// @flow

import type {
    ApiGateway, MockPostToConnection,
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

export const createApiGatewayClient: () => ApiGateway = () => {

    return {
        postToConnection: mockPostToConnection,
    };

};
