// @flow

import type { ClientAction } from './index';

export type ClientActionCreator<A: ClientAction> = ($PropertyType<A, 'payload'>) => A;