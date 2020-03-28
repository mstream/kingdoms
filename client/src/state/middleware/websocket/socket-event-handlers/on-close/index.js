// @flow

import type { ClientStore } from '../../../../types';

export const createOnCloseHandler = (
    {
        store,
    }: {
        store: ClientStore
    },
) => {
    return (): void => {
        console.log(`ws connection closed`);
    }
};
