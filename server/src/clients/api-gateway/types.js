// @flow

export type ApiGatewayPromise = () => Promise< void >;

export type PostToConnectionArgs = [$ReadOnly< {|
    ConnectionId: string,
    Data: string
|} >];

export type PostToConnectionResult = $ReadOnly< {|
    promise: ApiGatewayPromise,
|} >;

type PostToConnection = ( ...PostToConnectionArgs ) => PostToConnectionResult;
export type MockPostToConnection = JestMockFn< PostToConnectionArgs, PostToConnectionResult >;

export type ApiGateway = {
    postToConnection: PostToConnection,
};
