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
    ScenarioExecution,
} from '../../../types';

const name = `with non-existent username`;
const tags = [
    `positive`,
];

const execution: ScenarioExecution = async ( {
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

};


export const scenarios = combineScenarios(
    {
        children: [],
        parent  : {
            execution,
            name,
            tags,
        },
    },
);
