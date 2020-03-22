// @flow

import { dummyCognitoClient } from '../clients/cognito';
import { emptyJwk } from '../clients/cognito/util';
import { getPublicKey } from './auth';

describe('getPublicKey', () => {
    it('returns a public key which matches a given key id', async () => {
        const cognito = {
            ...dummyCognitoClient,
            getJwks: jest.fn(() => {
                return Promise.resolve(
                    {
                        keys: [
                            {
                                ...emptyJwk,
                                kid: 'id1',
                                n: 'publicKey1',
                            },
                            {
                                ...emptyJwk,
                                kid: 'id2',
                                n: 'publicKey2',
                            },
                            {
                                ...emptyJwk,
                                kid: 'id3',
                                n: 'publicKey3',
                            },
                        ],
                    },
                );
            }),
        };

        const expected = 'publicKey2';

        const actual = await getPublicKey({
            cognito,
            keyId: 'id2',
        });

        expect(actual).toEqual(expected);
    });

    it('returns null if there is no matching key id', async () => {
        const cognito = {
            ...dummyCognitoClient,
            getJwks: jest.fn(() => {
                return Promise.resolve(
                    {
                        keys: [
                            {
                                ...emptyJwk,
                                kid: 'id1',
                                n: 'publicKey1',
                            },
                            {
                                ...emptyJwk,
                                kid: 'id2',
                                n: 'publicKey2',
                            },
                            {
                                ...emptyJwk,
                                kid: 'id3',
                                n: 'publicKey3',
                            },
                        ],
                    },
                );
            }),
        };

        const expected = null;

        const actual = await getPublicKey({
            cognito,
            keyId: 'id4',
        });

        expect(actual).toEqual(expected);
    });
});
