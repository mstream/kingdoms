// @flow


import {
    appModel,
} from '../../../../../../models/app';
import {
    authModel,
} from '../../../../../../models/auth';


import type {
    ScenarioExecution,
} from '../../../../../types';

import type {
    OneOwnCityScenarioContext,
} from '../../types';

type Execution = ScenarioExecution< OneOwnCityScenarioContext,
    OneOwnCityScenarioContext >;


export const execution: Execution
    = async ( {
        context, logger, t,
    }, ) => {

        const {
            password, username, worldId,
        } = context;

        await appModel.actions.open(
            {
                logger,
                t,
                worldId,
            },
        );

        await authModel.actions.signIn(
            {
                logger,
                password,
                t,
                username,
            },
        );

        return context;

    };

