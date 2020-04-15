// @flow

import {
    getKeyId, verifyToken,
} from './utils';
import {
    getPublicKey,
} from '../connectors/auth';
import type {
    BuildUserProfileResult,
    MockBuildUserProfile,
    UserProfileResult,
} from './types';
import type {
    Cognito,
} from '../clients/cognito/types';

// $FlowFixMe
export const mockBuildUserProfile: MockBuildUserProfile = null;

const buildErrorResult = (
    {
        message,
    }: {
    message: string,
},
): UserProfileResult => {

    return {
        errors: [
            message,
        ],
        userProfile: null,
    };

};

export const buildUserProfile = async ( {
    cognito,
    token,
}: {
    cognito: Cognito,
    token: string,
}, ): BuildUserProfileResult => {

    try {

        const keyId = getKeyId(
            {
                token,
            },
        );

        if ( keyId == null ) {

            const errorMessage = `no key id in the token`;


            return buildErrorResult(
                {
                    message: errorMessage,
                },
            );

        }

        const publicKey = await getPublicKey(
            {
                cognito,
                keyId,
            },
        );

        if ( publicKey == null ) {

            const errorMessage = `could not retrieve a public key for the token with key id ${ keyId }`;


            return buildErrorResult(
                {
                    message: errorMessage,
                },
            );

        }

        return verifyToken(
            {
                issuer: cognito.userPoolUrl,
                publicKey,
                token,
            },
        );

    } catch ( error ) {

        return buildErrorResult(
            {
                message: `unexpeted error: ${ error.message }`,
            },
        );

    }

};
