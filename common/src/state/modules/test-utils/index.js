// @flow

import type {
    Jest,
} from '../../../test-utils/types';
import type {
    CommonStateReducer,
    CommonStateReducerTestScenario,
    CommonStateSelector,
    CommonStateSelectors,
    CommonStateSelectorTestScenario,
} from '../types';
import type {
    CommonAction, CommonActionKey,
} from '../../types';

export type CommonStateReducerTestScenarios<S> = {
    [CommonActionKey]: $ReadOnlyArray< CommonStateReducerTestScenario< S, CommonAction >, >,
};

type SelectorTestScenariosScenarios = $ReadOnly< {
    [string]: $ReadOnlyArray< CommonStateSelectorTestScenario< mixed > >,
} >;

const runReducerTestScenario = <S>( {
    jest,
    reducer,
    reducerKey,
    scenario,
}: {
    jest: Jest,
    reducer: CommonStateReducer< S >,
    reducerKey: string,
    scenario: CommonStateReducerTestScenario< S, CommonAction >,
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

            const expectedReductionResult = scenario.expectedReductionResultCreator(
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
    reducer: CommonStateReducer< S >,
    reducerKey: string,
    scenarios: CommonStateReducerTestScenarios< S >,
}, ): void => {

    Object.keys(
        scenarios,
    )
        .forEach(
            (
                actionKey: CommonActionKey,
            ) => {

                jest.describe(
                    actionKey,
                    () => {

                        scenarios[ actionKey ].forEach(
                            (
                                scenario: CommonStateReducerTestScenario< S, CommonAction >,
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


const runCommonStateSelectorTestScenario = (
    {
        jest,
        selector,
        scenario,
    }: {
        jest: Jest,
        selector: CommonStateSelector< mixed >,
        scenario: CommonStateSelectorTestScenario< mixed >,
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

export const runCommonStateSelectorsTestScenarios = (
    {
        jest,
        moduleSelectors,
        scenarios,
    }: {
        jest: Jest,
        moduleSelectors: CommonStateSelectors,
        scenarios: SelectorTestScenariosScenarios,
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
                                scenario: CommonStateSelectorTestScenario< mixed >,
                            ) => {

                                const selector: CommonStateSelector< mixed >
                                    = moduleSelectors[ selectorKey ];

                                if ( selector == null ) {

                                    throw Error(
                                        `selector '${ selectorKey }' is missing`,
                                    );

                                }

                                runCommonStateSelectorTestScenario(
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
