// @flow

export type SqsPromise = () => Promise< void >;

export type SendMessageArgs = [$ReadOnly< {|
    MessageBody: string,
    QueueUrl: string
|} >];

export type SendMessageResult = $ReadOnly< {|
    promise: SqsPromise,
|} >;

type SendMessage = ( ...SendMessageArgs ) => SendMessageResult;
export type MockSendMessage = JestMockFn< SendMessageArgs, SendMessageResult >;

export type Sqs = {
    sendMessage: SendMessage,
};
