// @flow


import {
    appModel,
} from '../../../../../../models/app';
import type {
    NewGameScenarioContext,
} from '../../types';
import type {
    ScenarioExecution,
} from '../../../../../types';

export const execution: ScenarioExecution< NewGameScenarioContext, NewGameScenarioContext > = async ( {
    context, logger, t,
}, ) => {

    const {
        worldId,
    } = context;

    await appModel.actions.open(
        {
            logger,
            t,
            worldId,
        },
    );

    return context;

};
