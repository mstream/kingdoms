// @flow

/*
 *
 */

// @flow-runtime

import {
    Type, reify,
} from 'flow-runtime';
import type {
    CommonState,
} from './state/modules/types';
import type {
    CommonPlayerAction,
} from './state/types';

export type ServerResponse = {
    request: ServerRequest,
    errors: $ReadOnlyArray< string >,
    state: CommonState,
};

export type ServerRequest = {
    action: CommonPlayerAction,
    worldId: string,
};

export const ServerRequestType = ( reify: Type< ServerRequest > );
export const ServerResponseType = ( reify: Type< ServerResponse > );
