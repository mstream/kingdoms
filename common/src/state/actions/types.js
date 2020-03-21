// @flow

import type { BaseAction } from '../../types/actions';

export const DUMMY: 'DUMMY' = 'DUMMY';
export const GET_CURRENT_STATE: 'GET_CURRENT_STATE' = 'GET_CURRENT_STATE';
export const RESET_STATE: 'RESET_STATE' = 'RESET_STATE';

export type CommonDummyAction = BaseAction<typeof DUMMY, void>;

export type CommonGetCurrentStateAction = BaseAction<typeof GET_CURRENT_STATE, void>;

export type CommonResetStateAction = BaseAction<typeof RESET_STATE, void>;

