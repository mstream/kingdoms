// @flow

import {
    emptyConfig,
} from '../config';
import {
    emptyHttpClient, emptyHttpClientResponse,
} from '../clients/utils';
import {
    emptyLogger,
} from '../../../common/src/logging';
import {
    graphqlApi,
} from './graphql';
import type {
    Config,
} from '../config/types';
import type {
    HttpClient, HttpClientResponse,
} from '../clients/types';

describe(
    `fetchWorldIds`,
    () => {

        it(
            `returns world ids on a successful response`,
            async () => {

                const config: Config = {
                    ...emptyConfig,
                };

                const logger = {
                    ...emptyLogger,
                };

                const mockHttpClient: HttpClient = {
                    ...emptyHttpClient,
                    request: jest.fn(
                        () => {

                            const httpClientResponse: HttpClientResponse = {
                                ...emptyHttpClientResponse,
                                data: {
                                    data: {
                                        worldIds: [
                                            `world1`,
                                            `world2`,
                                        ],
                                    },
                                },
                            };

                            return Promise.resolve(
                                httpClientResponse,
                            );

                        },
                    ),
                };

                const actual = await graphqlApi.fetchWorldIds(
                    {
                        config,
                        httpClient: mockHttpClient,
                        logger,
                    },
                );

                expect(
                    actual,
                )
                    .toEqual(
                        [
                            `world1`,
                            `world2`,
                        ],
                    );

            },
        );

    },
);
