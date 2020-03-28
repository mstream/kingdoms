// @flow


import type { BaseAction } from '../../../../../common/src/types/actions';

export const DUMMY: 'DUMMY' = 'DUMMY';

export type ClientDummyAction = BaseAction<typeof DUMMY, void>;