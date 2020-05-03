// @flow

import AWS from 'aws-sdk';
import type {
    CloudWatch, MockPutMetricData,
} from './types';

// $FlowFixMe
export const mockPutMetricData: MockPutMetricData = null;

export const createCloudWatchClient = (): CloudWatch => {

    return new AWS.CloudWatch(
        {
            apiVersion: `2010-08-01`,
        },
    );

};
