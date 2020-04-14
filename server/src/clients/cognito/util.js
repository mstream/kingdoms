// @flow

import type {
    Cognito, Jwk,
} from './types';

export const emptyJwk: Jwk = {
    alg: ``,
    e  : ``,
    kid: ``,
    kty: ``,
    n  : ``,
    use: ``,
};

export const dummyCognitoClient: Cognito = {
    getJwks: () => {

        return Promise.reject(
            `unsupported`,
        );

    },
    userPoolUrl: ``,
};
