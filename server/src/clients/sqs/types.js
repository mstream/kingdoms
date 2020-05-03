// @flow

import type {
    AwsSdkResult,
} from '../types';

export type SendMessageArgs = [$ReadOnly< {|
    MessageBody: string,
    QueueUrl: string
|} >];

export type SendMessageResult = AwsSdkResult< void >

type SendMessage = ( ...SendMessageArgs ) => SendMessageResult;
export type MockSendMessage = JestMockFn< SendMessageArgs, SendMessageResult >;

export type Sqs = {
    sendMessage: SendMessage,
};
