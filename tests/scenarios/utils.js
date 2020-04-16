// @flow


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
