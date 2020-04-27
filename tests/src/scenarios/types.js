// @flow

import {
    TestController,
} from 'testcafe';
import type {
    Logger,
} from '../../../common/src/logging/types';


export type ScenarioContext = $ReadOnly< {
    destroy: () => Promise< void >,
    ...
} >;

export type ScenarioExecution<IC: ScenarioContext, OC: ScenarioContext> = (
    $ReadOnly< {|
        context: IC,
        logger: Logger,
        t: TestController,
    |} >,
) => Promise< IC & OC >


export type TestScenario<IC: ScenarioContext, OC: ScenarioContext> =
    $ReadOnly< {|
        execution: ScenarioExecution< IC, OC >,
        path: $ReadOnlyArray< string >,
        tags: $ReadOnlyArray< string >,
    |} >;

