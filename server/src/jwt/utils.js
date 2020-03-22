// @flow


import jwt from 'jsonwebtoken';
import type { UserProfileResult } from './types';

export const getKeyId = ({ token }: { token: string }): ?string => {
    const decodedToken = jwt.decode(token, { complete: true });
    return decodedToken.header.kid;
};

export const verifyToken = (
    {
        issuer,
        publicKey,
        token,
    }: {
        issuer: string,
        publicKey: string,
        token: string
    },
): UserProfileResult => {
    try {
        console.info(`verifying token using public key: ${publicKey}`);
        const decodedTokenPayload = jwt.verify(token, publicKey, { issuer });
        const username = decodedTokenPayload['cognito:username'];

        if (username == null) {
            return {
                errors: ['token does not contain a cognito username'],
                userProfile: null,
            };
        }

        return {
            errors: [],
            userProfile: {
                name: username,
            },
        };
    } catch (error) {
        return {
            errors: [`token verification failure: ${error.message}`],
            userProfile: null,
        };
    }


};
