// @flow

import jwkToPem from 'jwk-to-pem';
import type {
    Cognito, Jwk, Jwks,
} from '../../clients/cognito/types';

export const getPublicKey = async ( {
    cognito,
    keyId,
}: {
    cognito: Cognito,
    keyId: string,
}, ): Promise< ?string > => {

    console.debug(
        `retrieving a public key for the key with id ${ keyId }`,
    );

    try {

        const jwks: Jwks = await cognito.getJwks();

        const jwk: ?Jwk = jwks.keys.find(
            (
                jwk: Jwk,
            ) => {

                return jwk.kid === keyId;

            },
        );

        return jwk == null
            ? null
            : jwkToPem(
                jwk,
            );

    } catch ( error ) {

        console.error(
            `could not retrieve a jwt key set: ${ error.message }`,
        );

    }

};
