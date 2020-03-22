// @flow

import axios from 'axios';
import { validateJwksType } from './validation';
import type { Cognito, GetJwks } from './types';
import type { Config } from '../../config/types';

export const createCognitoClient = ({ config }: { config: Config }): Cognito => {

    const userPoolUrl = `https://cognito-idp.${config.cognito.region}.amazonaws.com/${config.cognito.userPoolId}`;

    const getJwks: GetJwks = async () => {
        const response = await axios.get(`${userPoolUrl}/.well-known/jwks.json`);
        console.info(`jwt key set received from cognito: ${JSON.stringify(response.data)}`);
        return validateJwksType({ toValidate: response.data });
    };

    return {
        getJwks,
        userPoolUrl,
    };
};

export const dummyCognitoClient: Cognito = {
    getJwks: () => {
        return Promise.reject('unsupported');
    },
    userPoolUrl: '',
};


