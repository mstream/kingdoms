// @flow

import type {
    BaseAction,
} from '../../../../../../../common/src/types/actions';

export const DUMMY: 'DUMMY' = `DUMMY`;
export const SIGN_OUT: 'SIGN_OUT' = `SIGN_OUT`;

export type ClientDummyAction = BaseAction< typeof DUMMY, void >;
export type ClientSignOutAction = BaseAction< typeof SIGN_OUT, void >;
