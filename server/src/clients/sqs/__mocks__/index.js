// @flow

import type {
    MockSendMessage, Sqs,
} from '../types';

export const mockSendMessage: MockSendMessage = jest.fn(
    () => {

        return {
            promise: () => {

                return Promise.reject(
                    Error(
                        `mockSendMessage`,
                    ),
                );

            },
        };

    },
);

export const createSqsClient: () => Sqs = () => {

    return {
        sendMessage: mockSendMessage,
    };

};
