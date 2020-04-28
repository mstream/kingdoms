// @flow

import type {
    ClientAction,
    ClientActionKey,
    ClientStateReducer,
    ClientStateReducerTestScenario,
    ClientStateSelector,
    ClientStateSelectorTestScenario,
    ClientStateSelectors,
    ReducerScenarios,
    SelectorScenarios,
} from '../types';
import type {
    Jest,
} from '../../../../common/src/test-utils/types';

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

const runReducerTestScenarios = <S>(
    {
        jest,
        reducer,
        reducerKey,
        scenarios,
    }: {
        jest: Jest,
        reducer: ClientStateReducer< S >,
        reducerKey: string,
        scenarios: $ReadOnlyArray< ClientStateReducerTestScenario< S, ClientAction > >
    },
) => {

    scenarios.forEach(
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

};

export const generateTests = <S>(
    {
        jest,
        reducer,
        reducerKey,
        scenarios,
    }: {
        jest: Jest,
        reducer: ClientStateReducer< S >,
        reducerKey: string,
        scenarios: ReducerScenarios< S >,
    },
): void => {

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

                        runReducerTestScenarios<S>(
                            {
                                jest,
                                reducer,
                                reducerKey,
                                scenarios: scenarios[ actionKey ],
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

        // $FlowFixMe
        selector: ClientStateSelector< any, any >,

        // $FlowFixMe
        scenario: ClientStateSelectorTestScenario< any >,
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
