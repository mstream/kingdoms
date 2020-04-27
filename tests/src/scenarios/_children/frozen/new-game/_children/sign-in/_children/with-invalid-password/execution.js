// @flow


import {
    Selector,
} from 'testcafe';
import {
    authModel,
} from '../../../../../../../../models/auth';


import type {
    ScenarioExecution,
} from '../../../../../../../types';
import type {
    SignInScenarioContext,
} from '../../types';

type Execution = ScenarioExecution< SignInScenarioContext, SignInScenarioContext >;


export const execution: Execution
    = async ( {
        context, logger, t,
    }, ) => {

        const {
            password,
        } = context;

        await authModel.actions.signIn(
            {
                logger,
                password,
                t,
                username: `non-existent`,
            },
        );

        await authModel.expectations.isAtAuthPage(
            {
                t,
            },
        );

        await t
            .expect(
                Selector(
                    `*`,
                )
                    .withExactText(
                        `The username or password you entered is invalid`,
                    ).exists,
            )
            .ok();

        return context;

    };
