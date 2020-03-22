// @flow


export type BaseAction<T, P> = $ReadOnly<{
    type: T,
    payload: P,
}>;