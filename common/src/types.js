// @flow
// @flow-runtime

import { reify, Type } from 'flow-runtime';
import type { CommonState } from './state/modules/types';
import type { CommonAction } from './state/actions/types';

export type ServerRequest = CommonAction

export const ServerRequestType = (reify: Type<ServerRequest>);

export type ServerResponse = {
    request: CommonAction,
    errors: $ReadOnlyArray<string>,
    state: CommonState,
}

export const ServerResponseType = (reify: Type<ServerResponse>);