// @flow


import {
    getDuplicates,
} from '../../../common/src/utils';
import verror from 'verror';


import type {
    Scenario, ScenarioExecution,
} from './types';

export const combineScenarios = <IC, OC>(
    {
        parent,
        children,
    }: {
        parent: Scenario< IC, OC >,

        // $FlowFixMe
        children: $ReadOnlyArray< Scenario< OC, any > >,
    },

    // $FlowFixMe
): $ReadOnlyArray< Scenario< IC, any > > => {

    if ( children.length === 0 ) {

        return [
            parent,
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

                const outputContext: OC = await parent.execution(
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

