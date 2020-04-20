// @flow


import {
    getDuplicates,
} from '../../../common/src/utils';
import verror from 'verror';


import {
    getLocation, validateTestCafeError,
} from '../utils';
import type {
    Scenario, ScenarioContext, ScenarioExecution,
} from './types';
import type {
    TestCafeError,
} from '../types';

export const combineScenarios = <IC: ScenarioContext, OC: ScenarioContext>(
    {
        parent,
        children,
    }: {
        parent: Scenario< IC, OC >,

        children: $ReadOnlyArray< Scenario< OC, ScenarioContext > >,
    },
): $ReadOnlyArray< Scenario< IC, ScenarioContext > > => {

    const parentExecution: ScenarioExecution< IC, OC > = async ( {
        context, t,
    }, ) => {

        const startLocation = await getLocation();

        try {

            return await parent.execution(
                {
                    context,
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
                        info: {
                            context,
                            tags: parent.tags,
                        },
                        name: `SCENARIO_EXECUTION`,
                    },
                    JSON.stringify(error),
                    // `scenario failure`,
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

    const scenarioNames = children.map(
        (
            scenario: Scenario< OC, OC >,
        ) => {

            return scenario.name;

        },
    );

    const duplicatedScenarioNames = getDuplicates(
        {
            items: scenarioNames,
        },
    );

    if ( duplicatedScenarioNames.length > 0 ) {

        throw new verror.VError(
            {
                name: `INVALID_CONFIGURATION`,
            },
            `duplicated scenario names`,
        );

    }

    return children.reduce(
        (
            combinedScenarios, scenario,
        ) => {

            const execution: ScenarioExecution< IC, OC > = async ( {
                context, t,
            }, ) => {

                const outputContext: OC = await parentExecution(
                    {
                        context,
                        t,
                    },
                );

                return await scenario.execution(
                    {
                        context: outputContext,
                        t,
                    },
                );

            };

            const combinedScenario = {
                execution,
                name: `${ parent.name }|${ scenario.name }`,
                tags: [
                    ...parent.tags,
                    ...scenario.tags,
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
