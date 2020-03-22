// @flow

import type { Cognito, Jwk, Jwks } from '../clients/cognito/types';

export const getPublicKey = async ({ cognito, keyId }: { cognito: Cognito, keyId: string }): Promise<?string> => {
    const jwks: Jwks = await cognito.getJwks();
    const jwk: ?Jwk = jwks.keys.find((jwk: Jwk) => {
        return jwk.kid === keyId;
    });
    return jwk != null ? jwk.n : null;
};
