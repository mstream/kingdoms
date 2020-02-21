/**
 * @flow
 */

export interface AuthResponseContext {
    [name: string]: mixed;
}

export interface APIGatewayEventRequestContext {
    accountId: string;
    apiId: string;
    authorizer?: AuthResponseContext | null;
    connectedAt?: number;
    connectionId?: string;
    domainName?: string;
    domainPrefix?: string;
    eventType?: string;
    extendedRequestId?: string;
    httpMethod: string;
    identity: {
        accessKey: string | null,
        accountId: string | null,
        apiKey: string | null,
        apiKeyId: string | null,
        caller: string | null,
        cognitoAuthenticationProvider: string | null,
        cognitoAuthenticationType: string | null,
        cognitoIdentityId: string | null,
        cognitoIdentityPoolId: string | null,
        principalOrgId: string | null,
        sourceIp: string,
        user: string | null,
        userAgent: string | null,
        userArn: string | null,
    };
    messageDirection?: string;
    messageId?: string | null;
    path: string;
    stage: string;
    requestId: string;
    requestTime?: string;
    requestTimeEpoch: number;
    resourceId: string;
    resourcePath: string;
    routeKey?: string;
}

export interface APIGatewayProxyEvent {
    body: string | null;
    headers: { [name: string]: string };
    multiValueHeaders: { [name: string]: string[] };
    httpMethod: string;
    isBase64Encoded: boolean;
    path: string;
    pathParameters: { [name: string]: string } | null;
    queryStringParameters: { [name: string]: string } | null;
    multiValueQueryStringParameters: { [name: string]: string[] } | null;
    stageVariables: { [name: string]: string } | null;
    requestContext: APIGatewayEventRequestContext;
    resource: string;
}

export interface APIGatewayProxyResult {
    statusCode: number;
    headers?: {
        [header: string]: boolean | number | string,
    };
    multiValueHeaders?: {
        [header: string]: Array<boolean | number | string>,
    };
    body: string;
    isBase64Encoded?: boolean;
}

export interface ClientContextClient {
    installationId: string;
    appTitle: string;
    appVersionName: string;
    appVersionCode: string;
    appPackageName: string;
}

export interface ClientContextEnv {
    platformVersion: string;
    platform: string;
    make: string;
    model: string;
    locale: string;
}

export interface ClientContext {
    client: ClientContextClient;
    Custom?: mixed;
    env: ClientContextEnv;
}

export interface CognitoIdentity {
    cognitoIdentityId: string;
    cognitoIdentityPoolId: string;
}

export interface Context {
    callbackWaitsForEmptyEventLoop: boolean;
    functionName: string;
    functionVersion: string;
    invokedFunctionArn: string;
    memoryLimitInMB: string;
    awsRequestId: string;
    logGroupName: string;
    logStreamName: string;
    identity?: CognitoIdentity;
    clientContext?: ClientContext;

    getRemainingTimeInMillis(): number;

    done(error?: Error, result?: mixed): void;

    fail(error: Error | string): void;

    succeed(messageOrObject: mixed): void;

    succeed(message: string, object: mixed): void;
}

export interface ScheduledEvent {
    account: string;
    region: string;
    detail: mixed;
    ['detail-type']: string;
    source: string;
    time: string;
    id: string;
    resources: string[];
}

export type Callback<TResult = mixed> = (
    error?: Error | null | string,
    result?: TResult
) => void;

export type Handler<TEvent = mixed, TResult = mixed> = (
    event: TEvent,
    context: Context,
    callback: Callback<TResult>
) => void | Promise<TResult>;

export type APIGatewayProxyHandler = Handler<
    APIGatewayProxyEvent,
    APIGatewayProxyResult
>;

export type ScheduledHandler = Handler<ScheduledEvent, void>;

export type ApiGateway = mixed
export type Redis = mixed
