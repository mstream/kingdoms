// @flow

import type {
    AwsSdkResult,
} from '../types';

export type PostToConnectionArgs = [
    $ReadOnly< {|
    ConnectionId: string,
    Data: string
|} >
];

export type PostToConnectionResult = AwsSdkResult< void >

type PostToConnection = ( ...PostToConnectionArgs ) => PostToConnectionResult;

export type MockPostToConnection =
    JestMockFn< PostToConnectionArgs, PostToConnectionResult >;

export type WebSocketApiGateway = {
    postToConnection: PostToConnection,
};
