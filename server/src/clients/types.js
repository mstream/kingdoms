// @flow

type AwsSdkPromise<T> = () => Promise< T >;

export type AwsSdkResult<T> = $ReadOnly< {|
    promise: AwsSdkPromise< T >
|} >;

