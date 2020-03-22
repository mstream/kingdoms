// @flow


export type Range = $ReadOnly<{
    from: number,
    to: number,
}>;

export const emptyRange: Range = {
    from: 0,
    to: 0,
};
