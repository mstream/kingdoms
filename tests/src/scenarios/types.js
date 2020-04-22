// @flow

import {
    TestController,
} from 'testcafe';
import type {
    Logger,
} from '../../../common/src/logging/types';


// $FlowFixMe
export type ScenarioContext = Object;

export type ScenarioExecution<IC: ScenarioContext, OC: ScenarioContext> = (
    {
        context: IC,
        logger: Logger,
        t: TestController,
    },
) => Promise< OC >


export type TestScenario<IC: ScenarioContext, OC: ScenarioContext> = {
    execution: ScenarioExecution< IC, OC >,
    path: $ReadOnlyArray< string >,
    tags: $ReadOnlyArray< string >,
};
