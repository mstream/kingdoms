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
import {
    worldPageModel,
} from '../../../../models/app/world-page';

import type {
    ScenarioContext, ScenarioExecution,
} from '../../../types';
import type {
    TwoOwnCitiesScenarioContext,
} from './types';

type Execution = ScenarioExecution< ScenarioContext, TwoOwnCitiesScenarioContext >;


export const execution: Execution
    = async (
        {
            context,
            logger,
            t,
        },
    ) => {

        const worldId = generateId();
        const username = generateId();
        const password = generatePassword();
        const cityName1 = generateCityName();
        const cityName2 = generateCityName();

        await tools.createWorld(
            {
                id   : worldId,
                state: {
                    ...emptyCommonState,
                    cities: {
                        [ generateId() ]: {
                            ...emptyCityState,
                            location: {
                                x: -2,
                                y: -2,
                            },
                            name   : cityName1,
                            ownerId: username,
                        },
                        [ generateId() ]: {
                            ...emptyCityState,
                            location: {
                                x: 2,
                                y: 2,
                            },
                            name   : cityName2,
                            ownerId: username,
                        },
                    },
                    players: {
                        [ username ]: PLAYER_STATUS_PLAYING,
                    },
                    rules: {
                        ...emptyCommonState.rules,
                        gameSpeed: 0,
                    },
                },
            },
        );

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

        await worldPageModel.actions.openWorldPage(
            {
                logger,
                t,
                worldId,
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
            cityName1,
            cityName2,
            destroy: newDestroyContext,
            password,
            username,
            worldId,
        };

    };
