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
} from '../../../../../common/src/state/modules/types';


export type WorldStateUpdatePayload = $ReadOnly< {|
    state: CommonState,
    time: string,
    worldId: string,
|} >;

export const WorldStateUpdatePayloadType
    = ( reify: Type< WorldStateUpdatePayload > );

