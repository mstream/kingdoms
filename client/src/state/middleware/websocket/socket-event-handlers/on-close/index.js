// @flow

import type {
    Logger,
} from '../../../../../../../common/src/logging/types';

export const createOnCloseHandler = (
    {
        logger,
    }: {logger: Logger},
) => {

    return (): void => {

        logger.info(
            `Websocket connection closed`,
        );

    };

};
