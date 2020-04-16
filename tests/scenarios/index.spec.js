// @flow

import {
    TestController,
} from 'testcafe';
import {
    fixture as newGameFixture,
} from './new-game';
import type {
    Scenario, TestFixture,
} from './types';

const testFixtures = [
    newGameFixture,
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
                scenario: Scenario,
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

                    const context = await testFixture.contextCreator();

                    await scenario.execution(
                        {
                            context,
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
