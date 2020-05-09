// @flow

import type {
    ExecutionResult,
} from 'graphql';

import {
    GraphQLList,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    graphql,
} from 'graphql';
import {
    database,
} from '../../connectors/database';
import type {
    Logger,
} from '../../../../common/src/logging/types';
import type {
    Redis,
} from '../../clients/redis/types';

export const resolveQuery = async (
    {
        environment,
        logger,
        query,
        redis,
    }: $ReadOnly< {|
        environment: string,
        logger: Logger,
        query: string,
        redis: Redis,
    |} >,
): Promise< ExecutionResult > => {

    const schema = new GraphQLSchema(
        {
            query: new GraphQLObjectType(
                {
                    fields: {
                        worldIds: {
                            resolve: () => {

                                return database.worlds.getAll(
                                    {
                                        key: {
                                            environment,
                                        },
                                        logger,
                                        redis,
                                    },
                                );

                            },
                            type: new GraphQLList(
                                GraphQLString,
                            ),
                        },
                    },
                    name: `RootQueryType`,
                },
            ),
        },
    );

    return await graphql(
        schema,
        query,
    );

};
