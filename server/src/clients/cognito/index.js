// @flow

import {
    validateJwksType,
} from './validation';
import axios from 'axios';
import type {
    Cognito, GetJwks, GetJwksArgs, GetJwksResult,
} from './types';
import type {
    Config,
} from '../../config/types';
import type {
    Logger,
} from '../../../../common/src/logging/types';

// $FlowFixMe
export const mockGetJwks: JestMockFn< GetJwksArgs, GetJwksResult > = null;

export const createCognitoClient = (
    {
        config,
        logger,
    }: {
        config: Config,
        logger: Logger,
    },
): Cognito => {

    const userPoolUrl
        = `https://cognito-idp.${ config.cognito.region }`
        + `.amazonaws.com`
        + `/${ config.cognito.userPoolId }`;

    const getJwks: GetJwks = async () => {

        const response = await axios.get(
            `${ userPoolUrl }/.well-known/jwks.json`,
        );

        const serializedKeyset = JSON.stringify(
            response.data,
        );

        logger.info(
            {
                interpolationValues: [
                    serializedKeyset,
                ],
                message: `jwt key set received from cognito: %s`,
            }
            ,
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
