// @flow

/*
 *
 */

// @flow-runtime

import {
    Type, reify,
} from 'flow-runtime';
import type {
    CommonExecuteTimeStepAction,
} from './state/modules/_children/time/actions';
import type {
    CommonPlayerAction,
} from './state/types';
import type {
    CommonState,
} from './state/modules/types';

export type ExecuteTimeResponseRequest = $ReadOnly< {|
    action: CommonExecuteTimeStepAction,
    worldId: string
|} >;

export type ServerResponse = {
    request: ServerRequest | ExecuteTimeResponseRequest,
    errors: $ReadOnlyArray< string >,
    state: CommonState,
};

export type ServerRequest = {
    action: CommonPlayerAction,
    worldId: string,
};

export const ServerRequestType = ( reify: Type< ServerRequest > );
export const ServerResponseType = ( reify: Type< ServerResponse > );
