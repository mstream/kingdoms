// @flow

import {
    TestController,
} from 'testcafe';

import {
    scenarios as frozenNewGameScenarios,
} from './scenarios/frozen-new-game';

import {
    scenarios as newGameScenarios,
} from './scenarios/new-game';

import {
    logger,
} from './logging';
import sha256 from 'crypto-js/sha256';
import type {
    ScenarioContext, TestScenario,
} from './scenarios/types';


type TestFixture = $ReadOnly< {|
    name: string,

    // $FlowFixMe
    scenarios: $ReadOnlyArray< TestScenario< ScenarioContext, any > >,
|} >

const generateTestName = (
    {
        path,
    },
) => {

    const serializedPath = JSON.stringify(
        path,
    );

    const pathHash = sha256(
        serializedPath,
    );

    return `${ pathHash }`;

};

const testFixtures: $ReadOnlyArray< TestFixture > = [
    {
        name     : `frozen new game`,
        scenarios: frozenNewGameScenarios,
    },
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

        [
            ...testFixture.scenarios,
        ]
            .sort()
            .forEach(
                (
                    scenario: TestScenario< ScenarioContext, ScenarioContext >,
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

                        const context = await scenario.execution(
                            {
                                context: Object.freeze(
                                    {
                                        destroy: async () => {},
                                    },
                                ),
                                logger,
                                t,
                            },
                        );

                        await context.destroy();

                    };

                    // $FlowFixMe
                    test.meta(
                        {
                            path: scenario.path,
                            tags: tagsMetadata,
                        },
                    )(
                        generateTestName(
                            {
                                path: scenario.path,
                            },
                        ),
                        execution,
                    );

                },
            );

    },
);
