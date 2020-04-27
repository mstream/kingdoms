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

type Execution = ScenarioExecution< NewGameScenarioContext, NewGameScenarioContext >;

export const execution: Execution
    = async ( {
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
