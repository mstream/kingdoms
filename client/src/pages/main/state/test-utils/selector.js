// @flow

import type {
    ClientStateSelector,
    ClientStateSelectorTestScenario,
    ClientStateSelectors,
    ScenariosBySelector,
    SelectorScenario,
    SelectorScenarios,
} from '../types';
import type {
    Jest,
} from '../../../../../../common/src/test-utils/types';

const runClientStateSelectorTestScenario = (
    {
        jest,
        selector,
        scenario,
    }: {
        jest: Jest,

        // $FlowFixMe
        selector: ClientStateSelector< any, any >,

        scenario: SelectorScenario,
    },
): void => {

    jest.it(
        scenario.name,
        () => {

            const {
                state,
            } = scenario;
            const expected: mixed = scenario.expectedValue;

            const actual: mixed = selector(
                state,
            );

            jest.expect(
                actual,
            )
                .toEqual(
                    expected,
                );

        },
    );

};


export const generateSelectorTests = (
    {
        jest,
        moduleSelectors,
        scenarios,
    }: {
        jest: Jest,
        moduleSelectors: ClientStateSelectors,
        scenarios: ScenariosBySelector,
    },
): void => {

    Object.keys(
        scenarios,
    )
        .forEach(
            (
                selectorKey: string,
            ) => {

                jest.describe(
                    selectorKey,
                    () => {

                        const scenariosForSelector: SelectorScenarios
                            = scenarios[ selectorKey ];

                        scenariosForSelector.forEach(
                            (
                                scenario: ClientStateSelectorTestScenario< mixed >,
                            ) => {

                                // $FlowFixMe
                                const selector: ClientStateSelector< any, any >
                                    = moduleSelectors[ selectorKey ];

                                if ( selector == null ) {

                                    throw Error(
                                        `selector '${ selectorKey }' is missing`,
                                    );

                                }

                                runClientStateSelectorTestScenario(
                                    {
                                        jest,
                                        scenario,
                                        selector,
                                    },
                                );

                            },
                        );

                    },
                );

            },
        );

};
