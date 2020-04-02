// @flow

import type { Cognito, Jwk, Jwks } from '../clients/cognito/types';
import jwkToPem from 'jwk-to-pem';

export const getPublicKey = async ({
    cognito,
    keyId,
}: {
    cognito: Cognito,
    keyId: string,
}): Promise<?string> => {
    console.info(`retrieving a public key for the key with id ${keyId}`);

    try {
        const jwks: Jwks = await cognito.getJwks();

        const jwk: ?Jwk = jwks.keys.find((jwk: Jwk) => {
            return jwk.kid === keyId;
        });

        return jwk != null ? jwkToPem(jwk) : null;
    } catch (error) {
        console.error(`could not retrieve a jwt key set: ${error.message}`);
    }
};
