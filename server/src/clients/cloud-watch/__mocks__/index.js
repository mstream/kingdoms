// @flow

import type {
    CloudWatch, MockPutMetricData,
} from '../types';

export const mockPutMetricData: MockPutMetricData = jest.fn(
    () => {

        return {
            promise: () => {

                return Promise.reject(
                    Error(
                        `putMetricData`,
                    ),
                );

            },
        };

    },
);

export const createCloudWatchClient: () => CloudWatch
    = () => {

        return {
            putMetricData: mockPutMetricData,
        };

    };
