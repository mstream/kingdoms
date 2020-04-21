// @flow


import {
    getDuplicates,
} from '../../../common/src/utils';
import verror from 'verror';


import {
    getLocation, validateTestCafeError,
} from '../utils';
import type {
    ScenarioContext,
    ScenarioExecution,
    TestScenario,
} from './types';
import type {
    TestCafeError,
} from '../types';

export const combineScenarios = <IC: ScenarioContext, OC: ScenarioContext>(
    {
        parent,
        children,
    }: {
        parent: TestScenario< IC, OC >,
        children: $ReadOnlyArray< TestScenario< OC, ScenarioContext > >,
    },
): $ReadOnlyArray< TestScenario< IC, ScenarioContext > > => {

    const parentExecution: ScenarioExecution< IC, OC > = async ( {
        context, logger, t,
    }, ) => {

        const startLocation = await getLocation();

        try {

            return await parent.execution(
                {
                    context,
                    logger,
                    t,
                },
            );

        } catch ( error ) {

            const testCafeError: ?TestCafeError = validateTestCafeError(
                {
                    error,
                },
            );

            if ( testCafeError == null ) {

                throw new verror.VError(
                    {
                        cause: error,
                        info : {
                            context,
                            tags: parent.tags,
                        },
                        name: `SCENARIO_EXECUTION`,
                    },
                    `scenario failure`,
                );

            }

            throw {
                ...testCafeError,
                context: {
                    ...context,
                    startLocation,
                },
            };

        }

    };

    if ( children.length === 0 ) {

        return [
            {
                ...parent,
                execution: parentExecution,
            },
        ];

    }

    const serializedScenarioPaths: $ReadOnlyArray< string > = children.map(
        (
            scenario: TestScenario< OC, OC >,
        ) => {

            return JSON.stringify(
                scenario.path,
            );

        },
    );

    const duplicatedScenarioPaths = getDuplicates(
        {
            items: serializedScenarioPaths,
        },
    );

    if ( duplicatedScenarioPaths.length > 0 ) {

        throw new verror.VError(
            {
                name: `INVALID_CONFIGURATION`,
            },
            `duplicated scenario paths`,
        );

    }

    return children.reduce(
        (
            combinedScenarios, child,
        ) => {

            const execution: ScenarioExecution< IC, OC > = async ( {
                context, logger, t,
            }, ) => {

                const outputContext: OC = await parentExecution(
                    {
                        context,
                        logger,
                        t,
                    },
                );

                return await child.execution(
                    {
                        context: outputContext,
                        logger,
                        t,
                    },
                );

            };

            const combinedScenario = {
                execution,
                path: [
                    ...parent.path,
                    ...child.path,
                ],
                tags: [
                    ...parent.tags,
                    ...child.tags,
                ],
            };

            return [
                ...combinedScenarios,
                combinedScenario,
            ];

        },
        [],
    );

};
