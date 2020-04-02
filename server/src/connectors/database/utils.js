// @flow


export const createStateKey = (
    {
        environment,
        worldId,
    }: {
        environment: string,
        worldId: string,
    },
): string => {
    return `state:${environment}:${worldId}`;
};
