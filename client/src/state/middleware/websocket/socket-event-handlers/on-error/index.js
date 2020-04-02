// @flow

import type { ClientStore } from '../../../../types';
import { clientActions } from '../../../../modules/actions';
import { redirectToLoginPage } from '../../../../../util';

export const createOnErrorHandler = (
    {
        location,
        store,
    }: {
        location: Location,
        store: ClientStore
    },
) => {
    return (error: Error): void => {
        const errorMessage = error.message;
        console.error(`websocket communication error: ${errorMessage}`);

        store.dispatch(clientActions.errors.reportErrors([
            errorMessage,
        ]));

        setTimeout(
            () => {
                redirectToLoginPage({ location });
            },
            1000,
        );
    };
};
