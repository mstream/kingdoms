// @flow

import {
    TestController,
} from 'testcafe';


export type ScenarioExecution<IC, OC> = (
    {
        context: IC,
        t: TestController,
    },
) => Promise< OC >


export type Scenario<IC, OC> = {
    execution: ScenarioExecution< IC, OC >,
    name: string,
    tags: $ReadOnlyArray< string >,
};

