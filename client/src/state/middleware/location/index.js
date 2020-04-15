// @flow

import {
    SIGN_OUT,
} from '../../modules/actions/types';
import {
    redirectToLogoutPage,
} from '../../../location';
import type {
    ClientAction, ClientState,
} from '../../types';
import type {
    Config,
} from '../../../config/types';
import type {
    Logger,
} from '../../../../../common/src/logging/types';
import type {
    Middleware,
} from 'redux';

export const createLocationMiddleware = (
    {
        config,
        location,
        logger,
    }: {
        config: Config,
        location: Location,
        logger: Logger,
    },
): Middleware< ClientState, ClientAction > => {

    // $FlowFixMe
    const middleware: Middleware< ClientState, ClientAction > = () => {

        return (
            next,
        ) => {

            return (
                action: ClientAction,
            ) => {

                if ( action.type === SIGN_OUT ) {

                    redirectToLogoutPage(
                        {
                            config,
                            location,
                            logger,
                        },
                    );

                }

                return next(
                    action,
                );

            };

        };

    };

    return middleware;

};
