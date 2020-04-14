// @flow

/*
 *
 */

// @flow-runtime

import {
    reify, Type,
} from 'flow-runtime';

export type Jwk = $ReadOnly< {
    alg: string,
    e: string,
    kid: string,
    kty: string,
    n: string,
    use: string,
} >;

export type Jwks = $ReadOnly< {
    keys: $ReadOnlyArray< Jwk >,
} >;

export type GetJwksArgs = [];
export type GetJwksResult = Promise< Jwks >;


export type GetJwks = ( ...GetJwksArgs ) => GetJwksResult;
export type MockGetJwks = JestMockFn< GetJwksArgs, GetJwksResult >;

export type Cognito = {
    getJwks: GetJwks,
    userPoolUrl: string,
};

export const JwksType = ( reify: Type< Jwks > );
