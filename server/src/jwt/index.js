// @flow

import type { Cognito } from '../clients/cognito/types';
import type { UserProfileResult } from './types';
import { getKeyId, verifyToken } from './utils';
import { getPublicKey } from '../connectors/auth';

const buildErrorResult = ({
    message,
}: {
    message: string,
}): UserProfileResult => {
    return {
        errors: [message],
        userProfile: null,
    };
};

export const buildUserProfile = async ({
    cognito,
    token,
}: {
    cognito: Cognito,
    token: string,
}): Promise<UserProfileResult> => {
    try {
        const keyId = getKeyId({ token });

        if (keyId == null) {
            const errorMessage = `no key id in the token`;
            console.info(errorMessage);
            return buildErrorResult({ message: errorMessage });
        }

        const publicKey = await getPublicKey({ cognito, keyId });

        if (publicKey == null) {
            const errorMessage = `could not retrieve a public key for the token with key id ${keyId}`;
            console.info(errorMessage);
            return buildErrorResult({ message: errorMessage });
        }

        return verifyToken({
            issuer: cognito.userPoolUrl,
            publicKey,
            token,
        });
    } catch (error) {
        return buildErrorResult({
            message: `unexpeted error: ${error.message}`,
        });
    }
};
