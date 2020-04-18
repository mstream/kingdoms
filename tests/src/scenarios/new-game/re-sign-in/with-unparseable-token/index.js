// @flow


import {
    TOKEN_UNPARSABLE,
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
    Scenario,
    ScenarioExecution,
} from '../../../types';

const name = `with unparseable token`;
const tags = [
    `authentication`,
];

const execution: ScenarioExecution< NewGameScenarioContext, NewGameScenarioContext > = async ( {
    context, t,
}, ) => {

    const {
        worldId,
    } = context;

    await appModel.actions.open(
        {
            t,
            token: createToken(
                {
                    type: TOKEN_UNPARSABLE,
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
