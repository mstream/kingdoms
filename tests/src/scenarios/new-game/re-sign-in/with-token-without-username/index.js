// @flow


import {
    TOKEN_WITHOUT_USERNAME,
} from '../../../../jwt/types';
import {
    appModel,
} from '../../../../models/app';
import {
    authModel,
} from '../../../../models/auth';
import {
    combineScenarios,
} from '../../../utils';
import {
    createToken,
} from '../../../../jwt';
import type {
    NewGameScenarioContext,
} from '../../types';
import type {
    Scenario, ScenarioExecution,
} from '../../../types';

const name = `with a token without an username`;
const tags = [
    `authentication`,
];

const execution: ScenarioExecution< NewGameScenarioContext, NewGameScenarioContext > = async ( {
    context, logger, t,
}, ) => {

    const {
        worldId,
    } = context;

    await appModel.actions.open(
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


export const scenarios: $ReadOnlyArray< Scenario< NewGameScenarioContext, NewGameScenarioContext > >
    = combineScenarios(
        {
            children: [],
            parent  : {
                execution,
                name,
                tags,
            },
        },
    );
