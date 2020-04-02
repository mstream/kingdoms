// @flow

import jwt from 'jsonwebtoken';
import type { TokenType } from './types';
import {
    TOKEN_INVALID_PRIVATE_KEY,
    TOKEN_UNPARSABLE,
    TOKEN_WITHOUT_USERNAME,
} from './types';

export const createToken = ({ type }: { type: TokenType }): string => {
    switch (type) {
        case TOKEN_UNPARSABLE: {
            return 'UNPARSABLE_TOKEN';
        }
        case TOKEN_WITHOUT_USERNAME: {
            return jwt.sign({}, 'secret');
        }
        case TOKEN_INVALID_PRIVATE_KEY: {
            return jwt.sign(
                {
                    'cognito:username': 'username',
                },
                'secret',
            );
        }
        default: {
            throw Error(`unsupported token type '${type}'`);
        }
    }
};
