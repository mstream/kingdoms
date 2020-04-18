// @flow


import {
    Selector,
} from "testcafe";
import {
    authModel,
} from '../../../../models/auth';
import {
    combineScenarios,
} from '../../../utils';

import type {
    Scenario,
    ScenarioExecution,
} from '../../../types';
import type {
    SignInScenarioContext,
} from '../types';

const name = `with invalid password`;
const tags = [
    `positive`,
];

const execution: ScenarioExecution< SignInScenarioContext, SignInScenarioContext > = async ( {
    context, t,
}, ) => {

    const {
        password,
    } = context;

    await authModel.actions.signIn(
        {
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
