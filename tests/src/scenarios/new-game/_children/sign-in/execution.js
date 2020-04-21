// @flow


import {
    appModel,
} from '../../../../models/app';
import {
    generateId,
    generatePassword,
} from '../../../../../../common/src/utils';
import {
    tools,
} from '../../../../tools';
import type {
    NewGameScenarioContext,
} from '../../types';
import type {
    ScenarioExecution,
} from '../../../types';
import type {
    SignInScenarioContext,
} from './types';


export const execution: ScenarioExecution< NewGameScenarioContext, SignInScenarioContext > = async ( {
    context, logger, t,
}, ) => {

    const {
        worldId,
    } = context;

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

    await appModel.actions.open(
        {
            logger,
            t,
            worldId,
        },
    );

    return {
        ...context,
        password,
        username,
    };

};

