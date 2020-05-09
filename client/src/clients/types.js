// @flow

import type {
    Axios, AxiosXHR,
} from 'axios';

export type HttpClient = $ReadOnly< {
    request: $PropertyType< Axios, 'request' >;
} >;

// $FlowFixMe
export type HttpClientResponse = AxiosXHR< any, any >;

