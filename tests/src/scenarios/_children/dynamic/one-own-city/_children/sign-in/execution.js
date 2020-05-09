// @flow


import {
    authModel,
} from '../../../../../../models/auth';
import {
    worldPageModel,
} from '../../../../../../models/app/world-page';


import type {
    ScenarioExecution,
} from '../../../../../types';

import type {
    OneOwnCityScenarioContext,
} from '../../types';

type Execution = ScenarioExecution< OneOwnCityScenarioContext,
    OneOwnCityScenarioContext >;


export const execution: Execution
    = async (
        {
            context,
            logger,
            t,
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

        return context;

    };

