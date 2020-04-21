// @flow


import {
    appModel,
} from '../../../models/app';
import {
    combineScenarios,
} from '../../utils';
import {
    generateId, generatePassword,
} from '../../../../../common/src/utils';
import {
    tools,
} from '../../../tools';
import {
    scenarios as withInvalidPasswordScenarios,
} from './with-invalid-password';
import {
    scenarios as withNonExistentUsernameScenarios,
} from './with-non-existent-username';
import {
    scenarios as withValidCredentialsScenarios,
} from './with-valid-credentials';
import type {
    NewGameScenarioContext,
} from '../types';
import type {
    Scenario, ScenarioExecution,
} from '../../types';
import type {
    SignInScenarioContext,
} from './types';

const name = `sign in`;
const tags = [
    `authentication`,
];

const execution: ScenarioExecution< NewGameScenarioContext, SignInScenarioContext > = async ( {
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


export const scenarios: $ReadOnlyArray< Scenario< NewGameScenarioContext, SignInScenarioContext > >
    = combineScenarios(
        {
            children: [
                ...withInvalidPasswordScenarios,
                ...withNonExistentUsernameScenarios,
                ...withValidCredentialsScenarios,
            ],
            parent: {
                execution,
                name,
                tags,
            },
        },
    );
