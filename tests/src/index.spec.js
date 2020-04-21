// @flow

import {
    TestController,
} from 'testcafe';

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
    scenarios: $ReadOnlyArray< TestScenario< {||}, ScenarioContext > >,
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
                    scenario: TestScenario< {||}, ScenarioContext >,
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
                                logger,
                                t,
                            },
                        );

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
