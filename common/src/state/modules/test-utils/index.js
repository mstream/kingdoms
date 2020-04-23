// @flow

import type {
    CommonAction, CommonActionKey,
} from '../../types';
import type {
    CommonStateReducer,
    CommonStateReducerTestScenario,
    CommonStateSelector,
    CommonStateSelectorTestScenario,
    CommonStateSelectors,
} from '../types';
import type {
    Jest,
} from '../../../test-utils/types';


export type CommonStateReducerTestScenarios<S> = {
    [CommonActionKey]: $ReadOnlyArray< CommonStateReducerTestScenario< S, CommonAction >, >,
};

type SelectorTestScenariosScenarios = $ReadOnly< {

    // $FlowFixMe
    [string]: $ReadOnlyArray< CommonStateSelectorTestScenario< any > >,
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

        // $FlowFixMe
        selector: CommonStateSelector< any, any >,

        // $FlowFixMe
        scenario: CommonStateSelectorTestScenario< any >,
    },
): void => {

    jest.it(
        scenario.name,
        () => {

            const {
                state,
            } = scenario;

            // $FlowFixMe
            const expected: any = scenario.expectedValue;

            // $FlowFixMe
            const actual: any = selector(
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
                                // $FlowFixMe
                                scenario: CommonStateSelectorTestScenario< any >,
                            ) => {

                                // $FlowFixMe
                                const selector: CommonStateSelector< any, any >
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
