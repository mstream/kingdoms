// @flow


import {
    appModel,
} from '../../models/app';
import {
    emptyCommonState,
} from '../../../../common/src/state/modules/state';
import {
    generateId,
} from '../../../../common/src/utils';
import {
    tools,
} from '../../tools';
import type {
    NewGameScenarioContext,
} from './types';
import type {
    ScenarioContext, ScenarioExecution,
} from '../types';

export const execution: ScenarioExecution< ScenarioContext, NewGameScenarioContext > = async (
    {
        context,
        logger,
        t,
    },
) => {

    const worldId = generateId();

    await tools.createWorld(
        {
            id   : worldId,
            state: {
                ...emptyCommonState,
                rules: {
                    ...emptyCommonState.rules,
                    gameSpeed: 1,
                },
            },
        },
    );

    await appModel.actions.open(
        {
            logger,
            t,
            worldId,
        },
    );

    const newDestroyContext = async () => {

        await tools.destroyWorld(
            {
                id: worldId,
            },
        );

        await context.destroy();

    };

    return {
        ...context,
        destroy: newDestroyContext,
        worldId,
    };

};
