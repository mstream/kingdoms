// @flow

import type {
    HttpClient, HttpClientResponse,
} from './types';

export const emptyHttpClient: HttpClient = {
    request: () => {

        throw Error(
            `implement me`,
        );

    },
};

export const emptyHttpClientResponse: HttpClientResponse = {
    config: {
        url: ``,
    },
    data: {
    },
    headers: {
    },
    request: {
    },
    status    : 0,
    statusText: ``,
};
