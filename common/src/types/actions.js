// @flow
// @flow-runtime

export type BaseAction<T, P> = $ReadOnly<{
    type: T,
    payload: P,
}>;