// @flow

import type {
    BaseAction,
} from '../../../../../../../../../common/src/types/actions';

export const FAIL_WORLDS_UPDATE: 'FAIL_WORLDS_UPDATE' = `FAIL_WORLDS_UPDATE`;
export const REQUEST_WORLDS_UPDATE: 'REQUEST_WORLDS_UPDATE' = `REQUEST_WORLDS_UPDATE`;
export const SUCCEED_WORLDS_UPDATE: 'SUCCEED_WORLDS_UPDATE' = `SUCCEED_WORLDS_UPDATE`;

export type ClientRequestWorldsUpdateAction = BaseAction< typeof REQUEST_WORLDS_UPDATE,
    void, >;

export type ClientSucceedWorldsUpdateAction = BaseAction< typeof SUCCEED_WORLDS_UPDATE,
    $ReadOnlyArray< string >, >;

export type ClientFailWorldsUpdateAction = BaseAction< typeof FAIL_WORLDS_UPDATE,
    string, >;
