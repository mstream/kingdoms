// @flow


import {
    getDuplicates,
} from '../../common/src/utils';
import verror from 'verror';
import type {
    Scenario, ScenarioExecution,
} from './types';

export const combineScenarios = (
    {
        parent,
        children,
    }: {
        parent: Scenario,
        children: $ReadOnlyArray< Scenario >,
    },
): $ReadOnlyArray< Scenario > => {

    if ( children.length === 0 ) {

        return [
            parent,
        ];

    }

    const scenarioNames = children.map(
        (
            scenario: Scenario,
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

            const execution: ScenarioExecution = async ( {
                context, t,
            }, ) => {

                await parent.execution(
                    {
                        context,
                        t,
                    },
                );

                await scenario.execution(
                    {
                        context,
                        t,
                    },
                );

            };

            const combinedScenario = {
                execution,
                name: `${ parent.name } -> ${ scenario.name }`,
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
