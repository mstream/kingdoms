// @flow

import {
    TestController,
} from 'testcafe';

import {
    logger,
} from './logging';
import {
    scenarios,
} from './scenarios';
import sha256 from 'crypto-js/sha256';
import type {
    ScenarioContext, TestScenario,
} from './scenarios/types';

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


const createTestMetadata = (
    {
        tags,
    }: {
        tags: $ReadOnlyArray< string >
    },
): $ReadOnly< { [string]: true } > => {

    return tags.reduce(
        (
            tagsMetadata,
            tag: string,
        ) => {

            return {
                ...tagsMetadata,
                [ tag ]: true,
            };

        },
        {
        },
    );

};


fixture(
    `scenarios`,
);


[
    ...scenarios,
]
    .sort()
    .forEach(
        (
            scenario: TestScenario< ScenarioContext, ScenarioContext >,
        ) => {

            const tagsMetadata = createTestMetadata(
                {
                    tags: scenario.tags,
                },
            );

            const execution = async ( t: TestController, ) => {

                const context = await scenario.execution(
                    {
                        context: Object.freeze(
                            {
                                destroy: async () => {
                                },
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
