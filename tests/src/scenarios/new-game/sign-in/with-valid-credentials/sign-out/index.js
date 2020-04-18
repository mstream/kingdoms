// @flow

import {
    appModel,
} from '../../../../../models/app';
import {
    authModel,
} from '../../../../../models/auth';
import {
    combineScenarios,
} from '../../../../utils';

import type {
    Scenario, ScenarioExecution,
} from '../../../../types';
import type {
    SignInScenarioContext,
} from '../../types';


const name = `sign out`;
const tags = [
    `positive`,
];

const execution: ScenarioExecution< SignInScenarioContext, SignInScenarioContext > = async ( {
    context,
    t,
}, ) => {

    await appModel.actions.signOut(
        {
            t,
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


export const scenarios: $ReadOnlyArray< Scenario< SignInScenarioContext, SignInScenarioContext > >
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
