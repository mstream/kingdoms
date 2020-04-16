// @flow


import {
    Selector,
} from "testcafe";
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
    scenarios as createCityScenarios,
} from './create-city';
import {
    getLocation,
} from '../../../../utils';
import {
    scenarios as signOutScenarios,
} from './sign-out';
import type {
    ScenarioExecution,
} from '../../../types';

const name = `with valid credentials`;
const tags = [
    `positive`,
];

const execution: ScenarioExecution = async ( {
    context, t,
}, ) => {

    const {
        password, username,
    } = context;

    await authModel.actions.signIn(
        {
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

};


export const scenarios = combineScenarios(
    {
        children: [
            ...createCityScenarios,
            ...signOutScenarios,
        ],
        parent: {
            execution,
            name,
            tags,
        },
    },
);
