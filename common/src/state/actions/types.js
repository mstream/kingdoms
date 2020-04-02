// @flow

import type { BaseAction, BasePlayerAction } from '../../types/actions';

export const DUMMY: 'DUMMY' = 'DUMMY';
export const GET_CURRENT_STATE: 'GET_CURRENT_STATE' = 'GET_CURRENT_STATE';
export const RESET_STATE: 'RESET_STATE' = 'RESET_STATE';

export type CommonDummyAction = BaseAction<typeof DUMMY, void>;

export type CommonGetCurrentStateAction = BasePlayerAction<
    typeof GET_CURRENT_STATE,
    $ReadOnly<{ playerId: string }>,
>;

export type CommonResetStateAction = BaseAction<typeof RESET_STATE, void>;
