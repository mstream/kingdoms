// @flow


import {
    emptyCommonState,
} from '../../../../../../common/src/state/modules/state';
import {
    generateId,
} from '../../../../../../common/src/utils';
import {
    tools,
} from '../../../../tools';
import {
    worldPageModel,
} from '../../../../models/app/world-page';
import type {
    NewGameScenarioContext,
} from './types';

import type {
    ScenarioContext, ScenarioExecution,
} from '../../../types';

type Execution = ScenarioExecution< ScenarioContext, NewGameScenarioContext >;

export const execution: Execution
    = async (
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
                        gameSpeed: 0,
                    },
                },
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

            await tools.destroyWorld(
                {
                    id: worldId,
                },
            );

            await context.destroy();

        };

        return Object.freeze(
            {
                ...context,
                destroy: newDestroyContext,
                worldId,
            },
        );

    };
