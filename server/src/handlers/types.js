// @flow

export type Handler<TEvent = mixed, TResult = mixed> = (
    event: TEvent,
    context: Context,
    callback: Callback<TResult>,
) => void | Promise<TResult>;

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

export interface CognitoIdentity {
    cognitoIdentityId: string;
    cognitoIdentityPoolId: string;
}

export interface ClientContext {
    client: ClientContextClient;
    Custom?: mixed;
    env: ClientContextEnv;
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


export type Callback<TResult = mixed> = (error?: Error | string | null, result?: TResult) => void;

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
    protocol: string;
    httpMethod: string;
    identity: APIGatewayEventIdentity;
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

export interface APIGatewayEventIdentity {
    accessKey: string | null;
    accountId: string | null;
    apiKey: string | null;
    apiKeyId: string | null;
    caller: string | null;
    cognitoAuthenticationProvider: string | null;
    cognitoAuthenticationType: string | null;
    cognitoIdentityId: string | null;
    cognitoIdentityPoolId: string | null;
    principalOrgId: string | null;
    sourceIp: string;
    user: string | null;
    userAgent: string | null;
    userArn: string | null;
}

export interface AuthResponseContext {
    [name: string]: mixed;
}

export type APIGatewayProxyHandler = Handler<APIGatewayProxyEvent, APIGatewayProxyResult>;
export type APIGatewayProxyCallback = Callback<APIGatewayProxyResult>;

export type ProxyHandler = APIGatewayProxyHandler; // Old name
export type ProxyCallback = APIGatewayProxyCallback; // Old name
export type APIGatewayEvent = APIGatewayProxyEvent; // Old name
export type ProxyResult = APIGatewayProxyResult; // Old name

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
        [header: string]: boolean | number | string;
    };
    multiValueHeaders?: {
        [header: string]: Array<boolean | number | string>;
    };
    body: string;
    isBase64Encoded?: boolean;
}

export type CustomAuthorizerHandler = Handler<CustomAuthorizerEvent, CustomAuthorizerResult>;
export type CustomAuthorizerCallback = Callback<CustomAuthorizerResult>;

export interface CustomAuthorizerEvent {
    type: string;
    methodArn: string;
    authorizationToken?: string;
    resource?: string;
    path?: string;
    httpMethod?: string;
    headers?: { [name: string]: string };
    multiValueHeaders?: { [name: string]: string[] };
    pathParameters?: { [name: string]: string } | null;
    queryStringParameters?: { [name: string]: string } | null;
    multiValueQueryStringParameters?: { [name: string]: string[] } | null;
    stageVariables?: { [name: string]: string };
    requestContext?: APIGatewayEventRequestContext;
    domainName?: string;
    apiId?: string;
}

export interface CustomAuthorizerResult {
    principalId: string;
    policyDocument: PolicyDocument;
    context?: AuthResponseContext;
    usageIdentifierKey?: string;
}

export type AuthResponse = CustomAuthorizerResult;

export interface PolicyDocument {
    Version: string;
    Id?: string;
    Statement: Statement[];
}

export interface ConditionBlock {
    [condition: string]: Condition | Condition[];
}

export interface Condition {
    [key: string]: string | string[];
}

export type Statement =
    BaseStatement
    & StatementAction
    & (StatementResource | StatementPrincipal);

export interface BaseStatement {
    Effect: string;
    Sid?: string;
    Condition?: ConditionBlock;
}

export type PrincipalValue =
    { [key: string]: string | string[] }
    | string
    | string[];

export interface MaybeStatementPrincipal {
    Principal?: PrincipalValue;
    NotPrincipal?: PrincipalValue;
}

export interface MaybeStatementResource {
    Resource?: string | string[];
    NotResource?: string | string[];
}

export type StatementAction =
    { Action: string | string[], ... }
    | { NotAction: string | string[], ... };

export type StatementResource = MaybeStatementPrincipal &
    ({ Resource: string | string[], ... } | { NotResource: string | string[], ... });

export type StatementPrincipal = MaybeStatementResource &
    ({ Principal: PrincipalValue, ... } | { NotPrincipal: PrincipalValue, ... });

export type ScheduledHandler = Handler<ScheduledEvent, void>;

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
