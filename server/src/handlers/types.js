// @flow

import type {
    Json,
} from '../../../common/src/json';

export type Context = $ReadOnly< {
    callbackWaitsForEmptyEventLoop: boolean,
    functionName: string,
    functionVersion: string,
    invokedFunctionArn: string,
    memoryLimitInMB: string,
    awsRequestId: string,
    logGroupName: string,
    logStreamName: string,
    identity?: CognitoIdentity,
    clientContext?: ClientContext,

    getRemainingTimeInMillis(): number,

    done( error?: Error, result?: mixed ): void,

    fail( error: Error | string ): void,

    succeed( messageOrObject: mixed ): void,

    succeed( message: string, object: mixed ): void,
} >;

export type Handler<TEvent = mixed, TResult = mixed> = (
    event: TEvent,
    context: Context,
    callback: Callback< TResult >,
) => void | Promise< TResult >;

export type CognitoIdentity = $ReadOnly< {
    cognitoIdentityId: string,
    cognitoIdentityPoolId: string,
} >;

export type ClientContext = $ReadOnly< {
    client: ClientContextClient,
    Custom?: mixed,
    env: ClientContextEnv,
} >;

export type ClientContextClient = $ReadOnly< {
    installationId: string,
    appTitle: string,
    appVersionName: string,
    appVersionCode: string,
    appPackageName: string,
} >;

export type ClientContextEnv = $ReadOnly< {
    platformVersion: string,
    platform: string,
    make: string,
    model: string,
    locale: string,
} >;

export type Callback<TResult = mixed> = (
    error?: Error | string | null,
    result?: TResult,
) => void;

export type APIGatewayEventRequestContext = $ReadOnly< {
    accountId: string,
    apiId: string,
    authorizer?: ?AuthResponseContext,
    connectedAt?: number,
    connectionId?: string,
    domainName?: string,
    domainPrefix?: string,
    eventType?: string,
    extendedRequestId?: string,
    protocol: string,
    httpMethod: string,
    identity: APIGatewayEventIdentity,
    messageDirection?: string,
    messageId?: ?string,
    path: string,
    stage: string,
    requestId: string,
    requestTime?: string,
    requestTimeEpoch: number,
    resourceId: string,
    resourcePath: string,
    routeKey?: string,
} >;

export type APIGatewayEventIdentity = $ReadOnly< {
    accessKey: ?string,
    accountId: ?string,
    apiKey: ?string,
    apiKeyId: ?string,
    caller: ?string,
    cognitoAuthenticationProvider: ?string,
    cognitoAuthenticationType: ?string,
    cognitoIdentityId: ?string,
    cognitoIdentityPoolId: ?string,
    principalOrgId: ?string,
    sourceIp: string,
    user: ?string,
    userAgent: ?string,
    userArn: ?string,
} >;

export type AuthResponseContext = $ReadOnly< {
    [string]: mixed,
    ...
} >;

export type APIGatewayProxyHandler = Handler< APIGatewayProxyEvent,
    APIGatewayProxyResult, >;
export type APIGatewayProxyCallback = Callback< APIGatewayProxyResult >;

export type ProxyHandler = APIGatewayProxyHandler;
export type ProxyCallback = APIGatewayProxyCallback;
export type APIGatewayEvent = APIGatewayProxyEvent;
export type ProxyResult = APIGatewayProxyResult;

export type APIGatewayProxyEvent = $ReadOnly< {
    body: ?string | ?Json,
    headers: $ReadOnly< { [string]: string } >,
    multiValueHeaders: $ReadOnly< { [string]: string[] } >,
    httpMethod: string,
    isBase64Encoded: boolean,
    path: string,
    pathParameters: ?$ReadOnly< { [string]: string } >,
    queryStringParameters: ?$ReadOnly< { [string]: string } >,
    multiValueQueryStringParameters: ?$ReadOnly< { [string]: string[] } >,
    stageVariables: ?$ReadOnly< { [string]: string } >,
    requestContext: APIGatewayEventRequestContext,
    resource: string,
} >;

export type APIGatewayProxyResult = $ReadOnly< {
    statusCode: number,
    headers?: {
        [header: string]: boolean | number | string,
        ...
    },
    multiValueHeaders?: {
        [header: string]: Array< boolean | number | string >,
        ...
    },
    body: string,
    isBase64Encoded?: boolean,
} >;

export type CustomAuthorizerHandler = Handler< CustomAuthorizerEvent,
    CustomAuthorizerResult, >;

export type CustomAuthorizerCallback = Callback< CustomAuthorizerResult >;

export type CustomAuthorizerEvent = $ReadOnly< {
    type: string,
    methodArn: string,
    authorizationToken?: string,
    resource?: string,
    path?: string,
    httpMethod?: string,
    headers?: { [name: string]: string },
    multiValueHeaders?: { [name: string]: string[] },
    pathParameters?: ?{ [name: string]: string },
    queryStringParameters?: ?{ [name: string]: string },
    multiValueQueryStringParameters?: ?{ [name: string]: string[] },
    stageVariables?: { [name: string]: string },
    requestContext?: APIGatewayEventRequestContext,
    domainName?: string,
    apiId?: string,
} >;

export type CustomAuthorizerResult = $ReadOnly< {
    principalId: string,
    policyDocument: PolicyDocument,
    context?: AuthResponseContext,
    usageIdentifierKey?: string,
} >;

export type PolicyDocument = $ReadOnly< {
    Version: string,
    Id?: string,
    Statement: Statement[],
} >;

export type ConditionBlock = $ReadOnly< {
    [condition: string]: Condition | Condition[],
} >;

export type Condition = $ReadOnly< {
    [key: string]: string | string[],
    ...
} >;

export type Statement = BaseStatement &
    StatementAction &
    ( StatementResource | StatementPrincipal );

export type BaseStatement = $ReadOnly< {
    Effect: string,
    Sid?: string,
    Condition?: ConditionBlock,
} >;

export type PrincipalValue =
    | $ReadOnly< { [key: string]: string | string[] } >
    | string
    | string[];

export type MaybeStatementPrincipal = $ReadOnly< {
    Principal?: PrincipalValue,
    NotPrincipal?: PrincipalValue,
} >;

export type MaybeStatementResource = $ReadOnly< {
    Resource?: string | string[],
    NotResource?: string | string[],
} >;

export type StatementAction =
    | $ReadOnly< { Action: string | string[] } >
    | $ReadOnly< { NotAction: string | string[] } >;

export type StatementResource = MaybeStatementPrincipal &
    (
        | $ReadOnly< { Resource: string | string[] } >
        | $ReadOnly< { NotResource: string | string[] } >
        );

export type StatementPrincipal = MaybeStatementResource &
    (
        | $ReadOnly< { Principal: PrincipalValue } >
        | $ReadOnly< { NotPrincipal: PrincipalValue } >
        );

export type ScheduledHandler = Handler< ScheduledEvent, void >;

export type ScheduledEvent = $ReadOnly< {
    account: string,
    region: string,
    detail: mixed,

    ['detail-type']: string,

    source: string,
    time: string,
    id: string,
    resources: string[],
} >;

export type SqsEventRecord = $ReadOnly< {
    attributes: {[string]: string},
    awsRegion: string,
    body: string,
    eventSource: string,
    eventSourceArn: string,
    md5OfBody: string,
    messageAttributes: string,
    messageId: string,
    receiptHandle: string,
} >;

export type SqsEvent = $ReadOnly< {
    Records: $ReadOnlyArray< SqsEventRecord >
} >

export type SqsHandler = Handler< SqsEvent, void >;

type EventValidator<E, T> =
    ( $ReadOnly< {| event: E |} > ) =>
        $ReadOnly< {| result?: T, errors: $ReadOnlyArray< string > |} >

export type ProxyEventValidator<T> = EventValidator< APIGatewayProxyEvent, T >
export type SqsEventValidator<T> = EventValidator< SqsEvent, T >
