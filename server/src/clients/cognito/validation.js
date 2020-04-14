// @flow

import type {
    Jwks,
} from './types';
import {
    JwksType,
} from './types';

export const validateJwksType = (
    {
        toValidate,
    }: {
    toValidate: mixed,
},
): Jwks => {

    return JwksType.assert(
        toValidate,
    );

};
