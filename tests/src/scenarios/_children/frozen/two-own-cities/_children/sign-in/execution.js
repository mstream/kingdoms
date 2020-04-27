// @flow


import {
    appModel,
} from '../../../../../../models/app';


import {
    authModel,
} from '../../../../../../models/auth';
import type {
    ScenarioExecution,
} from '../../../../../types';

import type {
    TwoOwnCitiesScenarioContext,
} from '../../types';


export const execution: ScenarioExecution< TwoOwnCitiesScenarioContext, TwoOwnCitiesScenarioContext >
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

        await appModel.actions.open(
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

