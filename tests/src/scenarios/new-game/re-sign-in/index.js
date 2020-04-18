// @flow


import {
    appModel,
} from '../../../models/app';
import {
    combineScenarios,
} from '../../utils';
import {
    scenarios as withTokenWithInvalidSignatureScenarios,
} from './with-token-with-invalid-signature';
import {
    scenarios as withTokenWithoutUsernameScenarios,
} from './with-token-without-username';
import {
    scenarios as withUnparseableTokenScenarios,
} from './with-unparseable-token';
import type {
    NewGameScenarioContext,
} from '../types';
import type {
    Scenario,
    ScenarioExecution,
} from '../../types';

const name = `re-sign in`;
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
            worldId,
        },
    );

    return context;

};


export const scenarios: $ReadOnlyArray< Scenario< NewGameScenarioContext, NewGameScenarioContext > >
    = combineScenarios(
        {
            children: [
                ...withTokenWithInvalidSignatureScenarios,
                ...withTokenWithoutUsernameScenarios,
                ...withUnparseableTokenScenarios,
            ],
            parent: {
                execution,
                name,
                tags,
            },
        },
    );
