// @flow

import AWS from 'aws-sdk';
import type {
    MockSendMessage, Sqs,
} from './types';

// $FlowFixMe
export const mockSendMessage: MockSendMessage = null;

export const createSqsClient = (): Sqs => {

    return new AWS.SQS(
        {
            apiVersion: `2012-11-05`,
        },
    );

};
