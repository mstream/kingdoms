// @flow
// @flow-runtime

import { reify, Type } from 'flow-runtime';

export type Jwk = $ReadOnly<{
    alg: string,
    e: string,
    kid: string,
    kty: string,
    n: string,
    use: string,
}>;

export type Jwks = $ReadOnly<{
    keys: $ReadOnlyArray<Jwk>,
}>;

export type GetJwks = () => Promise<Jwks>

export type Cognito = {
    getJwks: GetJwks,
    userPoolUrl: string,
};

export const JwksType = (reify: Type<Jwks>);
