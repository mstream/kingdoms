// @flow

import {
    auth,
} from './connector/auth';
import type {
    User,
} from './connector/auth/types';
import type {
    CommonState,
} from '../../common/src/state/modules/types';
import {
    world,
} from './connector/world';
import type {
    Config,
} from './config/types';
import exec from 'await-exec';
import type {
    Logger,
} from '../../common/src/logging/types';

export const createTools = (
    {
        config,
        logger,
    }: $ReadOnly< {| config: Config, logger: Logger|} >,
) => {

    const createUsers = async ( {
        users,
    }: {
        users: $ReadOnlyArray< User >,
    }, ): Promise< void > => {

        await auth.createUsers(
            {
                config,
                exec,
                logger,
                users,
            },
        );

    };

    const createWorld = async ( {
        id,
        state,
    }: {
        id: string,
        state: CommonState,
    }, ): Promise< void > => {

        await world.createWorld(
            {
                config,
                exec,
                id,
                logger,
                state,
            },
        );

    };

    return {
        createUsers,
        createWorld,
    };

};
