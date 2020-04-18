// @flow

import {
    TestController,
} from 'testcafe';

import {
    scenarios as newGameScenarios,
} from './new-game';

import type {
    Scenario,
} from './types';

type TestFixture = $ReadOnly< {|
    name: string,

    // $FlowFixMe
    scenarios: $ReadOnlyArray< Scenario< void, any > >,
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
                // $FlowFixMe
                scenario: Scenario< void, any >,
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
                            context: undefined,
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
