// @flow

import type { ClientStore } from '../../../types';
import { clientActions } from '../../../modules/actions';

export const createOnErrorHandler = (
    {
        store,
    }: {
        store: ClientStore
    },
) => {
    return (error: Error): void => {
        const errorMessage = error.message;
        console.error(errorMessage);

        store.dispatch(clientActions.errors.reportErrors([
            errorMessage,
        ]));
    };
};
