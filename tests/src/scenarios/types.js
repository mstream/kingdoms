// @flow

import {
    TestController,
} from 'testcafe';


// $FlowFixMe
export type ScenarioContext = Object;

export type ScenarioExecution<IC: ScenarioContext, OC: ScenarioContext> = (
    {
        context: IC,
        t: TestController,
    },
) => Promise< OC >


export type Scenario<IC: ScenarioContext, OC: ScenarioContext> = {
    execution: ScenarioExecution< IC, OC >,
    name: string,
    tags: $ReadOnlyArray< string >,
};

