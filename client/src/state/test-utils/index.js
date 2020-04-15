// @flow

import type {
    Jest,
} from '../../../../common/src/test-utils/types';
import type {
    ClientAction,
    ClientActionKey,
    ClientStateReducer,
    ClientStateReducerTestScenario,
    ClientStateSelector,
    ClientStateSelectors,
    ClientStateSelectorTestScenario,
    ReducerScenarios,
    SelectorScenarios,
} from '../types';

const runReducerTestScenario = <S>( {
    jest,
    reducer,
    reducerKey,
    scenario,
}: {
    jest: Jest,
    reducer: ClientStateReducer< S >,
    reducerKey: string,
    scenario: ClientStateReducerTestScenario< S, ClientAction >,
}, ): void => {

    jest.it(
        scenario.name,
        () => {

            const previousLocalState
                = scenario.previousGlobalState[ reducerKey ];

            const actual = reducer(
                previousLocalState,
                scenario.action,
                scenario.previousGlobalState,
            );

            const expectedReductionResult
                = scenario.expectedLocalStateCreator(
                    {
                        previousLocalState,
                    },
                );

            jest.expect(
                actual,
            )
                .toEqual(
                    expectedReductionResult,
                );

        },
    );

};

export const runReducerTestScenarios = <S>( {
    jest,
    reducer,
    reducerKey,
    scenarios,
}: {
    jest: Jest,
    reducer: ClientStateReducer< S >,
    reducerKey: string,
    scenarios: ReducerScenarios< S >,
}, ): void => {

    Object.keys(
        scenarios,
    )
        .forEach(
            (
                actionKey: ClientActionKey,
            ) => {

                jest.describe(
                    actionKey,
                    () => {

                        scenarios[ actionKey ].forEach(
                            (
                                scenario: ClientStateReducerTestScenario< S, ClientAction >,
                            ) => {

                                runReducerTestScenario(
                                    {
                                        jest,
                                        reducer,
                                        reducerKey,
                                        scenario,
                                    },
                                );

                            },
                        );

                    },
                );

            },
        );

};

const runClientStateSelectorTestScenario = (
    {
        jest,
        selector,
        scenario,
    }: {
        jest: Jest,
        selector: ClientStateSelector< mixed >,
        scenario: ClientStateSelectorTestScenario< mixed >,
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


export const runClientStateSelectorsTestScenarios = (
    {
        jest,
        moduleSelectors,
        scenarios,
    }: {
        jest: Jest,
        moduleSelectors: ClientStateSelectors,
        scenarios: SelectorScenarios,
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

                        const scenariosForSelector = scenarios[ selectorKey ];

                        scenariosForSelector.forEach(
                            (
                                scenario: ClientStateSelectorTestScenario< mixed >,
                            ) => {

                                const selector: ClientStateSelector< mixed >
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
