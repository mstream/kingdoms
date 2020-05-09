// @flow

import type {
    Logger,
} from '../../../../../../../../../common/src/logging/types';

export const createOnCloseHandler = (
    {
        logger,
    }: {logger: Logger},
) => {

    return (): void => {

        logger.info(
            {
                message: `Websocket connection closed`,
            },
        );

    };

};
