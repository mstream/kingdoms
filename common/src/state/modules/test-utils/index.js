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

type ReducerScenario<S> = CommonStateReducerTestScenario< S, CommonAction >;

export type CommonStateReducerTestScenarios<S> = {
    [CommonActionKey]: $ReadOnlyArray< ReducerScenario< S > >,
};

// $FlowFixMe
type SelectorScenario = CommonStateSelectorTestScenario< any >

type SelectorTestScenariosScenarios = $ReadOnly< {

    [string]: $ReadOnlyArray< SelectorScenario >,
} >;

const runReducerTestScenario = <S>(
    {
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

            const expectedReductionResult
                = scenario.expectedReductionResultCreator(
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


export const runReducerTestScenarios = <S>(
    {
        jest,
        reducer,
        reducerKey,
        scenarios,
    }: {
        jest: Jest,
        reducer: CommonStateReducer< S >,
        reducerKey: string,
        scenarios: CommonStateReducerTestScenarios< S >,
    },
): void => {

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
                                scenario: CommonStateReducerTestScenario< S,
                                    CommonAction >,
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

const runCommonStateSelectorTestScenarios = (
    {
        jest,
        scenarios,
        selectorKey,
        selectors,
    }: {
        jest: Jest,

        // $FlowFixMe
        scenarios: $ReadOnlyArray< CommonStateSelectorTestScenario< any > >,
        selectorKey: string,
        selectors: CommonStateSelectors,
    },
): void => {

    scenarios.forEach(
        (
            // $FlowFixMe
            scenario: CommonStateSelectorTestScenario< any >,
        ) => {

            // $FlowFixMe
            const selector: CommonStateSelector< any, any >
                = selectors[ selectorKey ];

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

};

export const generateTests = (
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

                        runCommonStateSelectorTestScenarios(
                            {
                                jest,
                                scenarios: scenariosForSelector,
                                selectorKey,
                                selectors: moduleSelectors,
                            },
                        );

                    },
                );

            },
        );

};
