// @flow


import {
    PLAYER_STATUS_PLAYING,
} from '../../../../../../common/src/state/modules/_children/players/reducer/types';
import {
    emptyCityState,
} from '../../../../../../common/src/state/modules/_children/cities/reducer/state';
import {
    emptyCommonState,
} from '../../../../../../common/src/state/modules/state';
import {
    generateCityName,
    generateId,
    generatePassword,
} from '../../../../../../common/src/utils';
import {
    tools,
} from '../../../../tools';
import type {
    OneOwnCityScenarioContext,
} from './types';
import type {
    ScenarioContext, ScenarioExecution,
} from '../../../types';

type Execution = ScenarioExecution< ScenarioContext, OneOwnCityScenarioContext >;


export const execution: Execution
    = async (
        {
            context

            ,
        },
    ) => {

        const cityName = generateCityName();
        const password = generatePassword();
        const username = generateId();
        const worldId = generateId();

        await tools.createUsers(
            {
                users: [
                    {
                        password,
                        username,
                    },
                ],
            },
        );

        await tools.createWorld(
            {
                id   : worldId,
                state: {
                    ...emptyCommonState,
                    cities: {
                        [ generateId() ]: {
                            ...emptyCityState,
                            name   : cityName,
                            ownerId: username,
                        },
                    },
                    players: {
                        [ username ]: PLAYER_STATUS_PLAYING,
                    },
                    rules: {
                        ...emptyCommonState.rules,
                        gameSpeed: 1,
                    },
                },
            },
        );

        const newDestroyContext = async () => {

            await tools.deleteUsers(
                {
                    usernames: [
                        username,
                    ],
                },
            );

            await tools.destroyWorld(
                {
                    id: worldId,
                },
            );

            await context.destroy();

        };

        return {
            ...context,
            cityName,
            destroy: newDestroyContext,
            password,
            username,
            worldId,
        };

    };
