// @flow

import {
    authModel,
} from '../../../../../../../../../../../../models/auth';
import {
    worldPageModel,
} from '../../../../../../../../../../../../models/app/world-page';

import type {
    ScenarioExecution,
} from '../../../../../../../../../../../types';
import type {
    SignInScenarioContext,
} from '../../../../../../types';

type Execution = ScenarioExecution< SignInScenarioContext, SignInScenarioContext >;

export const execution: Execution
    = async ( {
        context,
        t,
    }, ) => {

        await worldPageModel.actions.signOut(
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
