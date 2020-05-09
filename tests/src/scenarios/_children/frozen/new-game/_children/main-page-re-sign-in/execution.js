// @flow


import {
    mainPageModel,
} from '../../../../../../models/app/main-page';
import type {
    NewGameScenarioContext,
} from '../../types';
import type {
    ScenarioExecution,
} from '../../../../../types';

type Execution = ScenarioExecution< NewGameScenarioContext, NewGameScenarioContext >;

export const execution: Execution
    = async (
        {
            context,
            logger,
            t,
        },
    ) => {

        await mainPageModel.actions.openMainPage(
            {
                logger,
                t,
            },
        );

        return context;

    };
