// @flow
// @flow-runtime

import { reify, Type } from 'flow-runtime';
import type { CommonState } from './state/modules/types';
import type { CommonAction, CommonPlayerAction } from './state/types';

export type ServerResponse = {
    request: CommonAction,
    errors: $ReadOnlyArray<string>,
    state: CommonState,
};

export const CommonPlayerActionType = (reify: Type<CommonPlayerAction>);

export const ServerResponseType = (reify: Type<ServerResponse>);
