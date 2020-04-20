// @flow

import {
    TestController,
} from 'testcafe';

import {
    scenarios as newGameScenarios,
} from './new-game';

import type {
    Scenario, ScenarioContext,
} from './types';

type TestFixture = $ReadOnly< {|
    name: string,
    scenarios: $ReadOnlyArray< Scenario< {||}, ScenarioContext > >,
|} >

const testFixtures: $ReadOnlyArray< TestFixture > = [
    {
        name     : `new game`,
        scenarios: newGameScenarios,
    },
];


testFixtures.forEach(
    (
        testFixture: TestFixture,
    ) => {

        fixture(
            testFixture.name,
        );

        testFixture.scenarios.forEach(
            (
                scenario: Scenario< {||}, ScenarioContext >,
            ) => {

                const tagsMetadata = scenario.tags.reduce(
                    (
                        tagsMetadata, tag,
                    ) => {

                        return {
                            ...tagsMetadata,
                            [ tag ]: true,
                        };

                    },
                    {
                    },
                );

                const execution = async ( t: TestController, ) => {

                    await scenario.execution(
                        {
                            context: Object.freeze(
                                {
                                },
                            ),
                            t,
                        },
                    );

                };

                // $FlowFixMe
                test.meta(
                    tagsMetadata,
                )(
                    scenario.name,
                    execution,
                );

            },
        );

    },
);
