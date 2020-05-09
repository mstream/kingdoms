// @flow


import {
    generateId,
    generatePassword,
} from '../../../../../../../../common/src/utils';
import {
    mainPageModel,
} from '../../../../../../models/app/main-page';
import {
    tools,
} from '../../../../../../tools';
import type {
    NewGameScenarioContext,
} from '../../types';
import type {
    ScenarioExecution,
} from '../../../../../types';
import type {
    SignInScenarioContext,
} from './types';

type Execution = ScenarioExecution< NewGameScenarioContext, SignInScenarioContext >;


export const execution: Execution
    = async (
        {
            context, logger, t,
        },
    ) => {

        const password = generatePassword();
        const username = generateId();

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

        await mainPageModel.actions.openMainPage(
            {
                logger,
                t,
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

            await context.destroy();

        };

        return {
            ...context,
            destroy: newDestroyContext,
            password,
            username,
        };

    };

