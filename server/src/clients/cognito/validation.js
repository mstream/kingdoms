// @flow

import {
    JwksType,
} from './types';
import type {
    Jwks,
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
