// @flow

export type BaseAction<T, P> = $ReadOnly<{
    type: T,
    payload: P,
}>;

export type BasePlayerAction<
    T,
    P: $ReadOnly<{ playerId: string }>,
> = BaseAction<T, P>;
