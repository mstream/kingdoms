// @flow


import {
    TOKEN_WITHOUT_USERNAME,
} from '../../../../../../../../jwt/types';
import {
    authModel,
} from '../../../../../../../../models/auth';
import {
    createToken,
} from '../../../../../../../../jwt';
import {
    worldPageModel,
} from '../../../../../../../../models/app/world-page';
import type {
    NewGameScenarioContext,
} from '../../../../types';
import type {
    ScenarioExecution,
} from '../../../../../../../types';

type Execution = ScenarioExecution< NewGameScenarioContext, NewGameScenarioContext >;

export const execution: Execution
    = async (
        {
            context, logger, t,
        },
    ) => {

        const {
            worldId,
        } = context;

        await worldPageModel.actions.openWorldPage(
            {
                logger,
                t,
                token: createToken(
                    {
                        type: TOKEN_WITHOUT_USERNAME,
                    },
                ),
                worldId,
            },
        );

        await authModel.expectations.gotRedirectedFromAppToAuth(
            {
                action: `login`,
                t,
            },
        );

        return context;

    };
