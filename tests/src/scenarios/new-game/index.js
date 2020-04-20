// @flow


import {
    scenarios as reSignInScenarios,
} from './re-sign-in';
import {
    scenarios as signInScenarios,
} from './sign-in';


import {
    appModel,
} from '../../models/app';
import {
    combineScenarios,
} from '../utils';
import {
    emptyCommonState,
} from '../../../../common/src/state/modules/state';
import {
    generateId,
} from '../../../../common/src/utils';
import {
    tools,
} from '../../tools';
import type {
    NewGameScenarioContext,
} from './types';
import type {
    Scenario, ScenarioExecution,
} from '../types';

const name = `new game`;
const tags = [];

const execution: ScenarioExecution< {||}, NewGameScenarioContext > = async ( {
    t,
}, ) => {

    const worldId = generateId();

    await tools.createWorld(
        {
            id   : worldId,
            state: emptyCommonState,
        },
    );

    await appModel.actions.open(
        {
            t,
            worldId,
        },
    );

    return {
        worldId,
    };

};


export const scenarios: $ReadOnlyArray< Scenario< {||}, NewGameScenarioContext > >
    = combineScenarios(
        {
            children: [
                ...reSignInScenarios,
                ...signInScenarios,
            ],
            parent: {
                execution,
                name,
                tags,
            },
        },
    );

