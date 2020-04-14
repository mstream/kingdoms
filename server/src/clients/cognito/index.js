// @flow

import axios from 'axios';
import {
    validateJwksType,
} from './validation';
import type {
    Cognito, GetJwks, GetJwksArgs, GetJwksResult,
} from './types';
import type {
    Config,
} from '../../config/types';

// $FlowFixMe
export const mockGetJwks: JestMockFn< GetJwksArgs, GetJwksResult > = null;

export const createCognitoClient = (
    {
        config,
    }: {
        config: Config,
    },
): Cognito => {

    const userPoolUrl = `https://cognito-idp.${ config.cognito.region }.amazonaws.com/${ config.cognito.userPoolId }`;

    const getJwks: GetJwks = async () => {

        const response = await axios.get(
            `${ userPoolUrl }/.well-known/jwks.json`,
        );

        console.info(
            `jwt key set received from cognito: ${ JSON.stringify(
                response.data,
            ) }`,
        );

        return validateJwksType(
            {
                toValidate: response.data,
            },
        );

    };

    return {
        getJwks,
        userPoolUrl,
    };

};
