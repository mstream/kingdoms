// @flow

import {
    auth,
} from './connector/auth';
import {
    world,
} from './connector/world';
import exec from 'await-exec';
import type {
    CommonState,
} from '../../common/src/state/modules/types';
import type {
    Config,
} from './config/types';
import type {
    Logger,
} from '../../common/src/logging/types';
import type {
    User,
} from './connector/auth/types';

export const createTools = (
    {
        config,
        logger,
    }: $ReadOnly< {|
        config: Config,
        logger: Logger
    |} >,
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

    const deleteUsers = async ( {
        usernames,
    }: {
        usernames: $ReadOnlyArray< string >,
    }, ): Promise< void > => {

        await auth.deleteUsers(
            {
                config,
                exec,
                logger,
                usernames,
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

        await world.create(
            {
                config,
                exec,
                id,
                logger,
                state,
            },
        );

    };

    const destroyWorld = async ( {
        id,
    }: {
        id: string,
    }, ): Promise< void > => {

        await world.destroy(
            {
                config,
                exec,
                id,
                logger,
            },
        );

    };

    return {
        createUsers,
        createWorld,
        deleteUsers,
        destroyWorld,
    };

};
