// @flow

import {
    appModel,
} from '../../../../../../../../../../models/app';
import {
    authModel,
} from '../../../../../../../../../../models/auth';

import type {
    ScenarioExecution,
} from '../../../../../../../../../types';
import type {
    SignInScenarioContext,
} from '../../../../types';


export const execution: ScenarioExecution< SignInScenarioContext, SignInScenarioContext > = async ( {
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
