// @flow

import {
    clientActions,
} from '../../../../modules/actions';
import {
    redirectToLoginPage,
} from '../../../../../location';
import type {
    ClientStore,
} from '../../../../types';
import type {
    Config,
} from '../../../../../config/types';
import type {
    Logger,
} from '../../../../../../../common/src/logging/types';

export const createOnErrorHandler = (
    {
        config,
        location,
        logger,
        store,
    }: {
        config: Config,
        location: Location,
        logger: Logger,
        store: ClientStore,
    },
) => {

    return (
        error: Error,
    ): void => {

        const errorMessage = error.message;

        logger.error(
            `Websocket communication error: %s`,
            errorMessage,
        );

        store.dispatch(
            clientActions.errors.reportErrors(
                [
                    errorMessage,
                ],
            ),
        );

        setTimeout(
            () => {

                redirectToLoginPage(
                    {
                        config,
                        location,
                        logger,
                    },
                );

            },
            1000,
        );

    };

};
