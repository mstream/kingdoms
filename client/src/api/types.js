// @flow

/*
 *
 */

// @flow-runtime


import {
    Type, reify,
} from 'flow-runtime';
import type {
    ExecutionResult,
} from 'graphql';


export type WorldIdsResponse = $ReadOnly< {|
    worldIds: $ReadOnlyArray< string >,
|} >;


export const ExecutionResultType = ( reify: Type< ExecutionResult > );
export const WorldIdsResponseType = ( reify: Type< WorldIdsResponse > );
