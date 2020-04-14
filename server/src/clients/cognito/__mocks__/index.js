// @flow

import type {
    Cognito, MockGetJwks,
} from '../types';

export const mockGetJwks: MockGetJwks = jest.fn(
    () => {

        return Promise.reject(
            Error(
                `mockGetJwks`,
            ),
        );

    },
);

export const stubUserPoolUrl = `userPoolUrl1`;

export const createCognitoClient: () => Cognito = () => {

    return {
        getJwks    : mockGetJwks,
        userPoolUrl: stubUserPoolUrl,
    };

};
