// @flow

import type { ClientState } from '../state/types';

type ExtractReturn<F> = $Call<<T>((...Iterable<ClientState>) => T) => T, F>;
type ExtractReturnWithDispatch = <A>((...args: Array<mixed>) => A) => (A) => Promise<mixed>;

export type StateToProps<S> = ExtractReturn<S>;
export type ActionCreatorsProps<A> = $ObjMap<A, ExtractReturnWithDispatch>