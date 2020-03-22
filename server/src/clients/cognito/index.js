// @flow

import type { Config } from '../../config';
import axios from 'axios';
import { validateJwksType } from './validation';
import type { Cognito, GetJwks } from './types';

export const createCognitoClient = ({ config }: { config: Config }): Cognito => {
    const getJwks: GetJwks = async () => {
        const response = await axios.get(`https://cognito-idp.${config.cognito.region}.amazonaws.com/${config.cognito.userPoolId}/.well-known/jwks.json`);
        return validateJwksType({ toValidate: response.data });
    };

    return {
        getJwks,
    };
};

export const dummyCognitoClient: Cognito = {
    getJwks: () => {
        return Promise.reject('unsupported');
    },
};


