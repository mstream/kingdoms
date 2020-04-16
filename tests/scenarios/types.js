// @flow

import {
    TestController,
} from 'testcafe';


export type ScenarioContext = {
    password: string,
    username: string,
    worldId: string,
};


export type ScenarioExecution = (
    {
        context: ScenarioContext,
        t: TestController,
    },
) => Promise< void >


export type Scenario = {
    execution: ScenarioExecution,
    name: string,
    tags: $ReadOnlyArray< string >,
};

export type TestFixture = {
    contextCreator: () => Promise< ScenarioContext >,
    name: string,
    scenarios: $ReadOnlyArray< Scenario >,
};

