// @flow


import {
    Selector,
} from 'testcafe';
import {
    appModel,
} from '../../../../../../models/app';
import {
    authModel,
} from '../../../../../../models/auth';
import {
    getLocation,
} from '../../../../../../utils';

import type {
    ScenarioExecution,
} from '../../../../../types';
import type {
    SignInScenarioContext,
} from '../../types';


export const execution: ScenarioExecution< SignInScenarioContext, SignInScenarioContext > = async ( {
    context, logger, t,
}, ) => {

    const {
        password, username,
    } = context;

    await authModel.actions.signIn(
        {
            logger,
            password,
            t,
            username,
        },
    );

    await appModel.expectations.isAtAppPage(
        {
            t,
        },
    );

    await t.expect(
        getLocation(),
    )
        .contains(
            `token=`,
        );

    await t.expect(
        Selector(
            `*`,
        )
            .withExactText(
                username,
            ).exists,
    )
        .ok();

    await t.expect(
        Selector(
            `*`,
        )
            .withExactText(
                `Start game`,
            ).exists,
    )
        .ok();

    return context;

};

