// @flow


import {
    worldPageModel,
} from '../../../../../../models/app/world-page';


import {
    authModel,
} from '../../../../../../models/auth';
import type {
    ScenarioExecution,
} from '../../../../../types';
import type {
    TwoOwnCitiesScenarioContext,
} from '../../types';


type Execution = ScenarioExecution< TwoOwnCitiesScenarioContext,
    TwoOwnCitiesScenarioContext >;


export const execution: Execution
    = async (
        {
            context, logger, t,
        },
    ) => {

        const {
            password,
            username,
            worldId,
        } = context;

        await worldPageModel.actions.openWorldPage(
            {
                logger,
                t,
                worldId,
            },
        );

        await authModel.actions.signIn(
            {
                logger,
                password,
                t,
                username,
            },
        );

        return {
            ...context,
        };

    };

