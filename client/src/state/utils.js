// @flow

import type {
    ActionReducers,
    ClientAction,
    ClientActionKey,
    ClientState,
    ClientStateActionReducer,
    ClientStateReducer,
    ClientStateReducerTestScenario,
    ClientStateSelector,
    ClientStateSelectorTestScenario,
    ClientStateSelectors,
    ReducerScenarios,
    SelectorScenarios,
} from './types';
import type {
    Jest,
} from '../../../common/src/test-utils/types';

const unsupportedActionReducer = <S, A: ClientAction>( {
    localState,

}: $ReadOnly< {
    localState: S,
    action: A,
    globalState: ClientState,
} >, ): S => {

    return localState;

};

export const createClientStateReducer = <S>( {
    actionReducers,
    initialState,
}: {
    actionReducers: ActionReducers< S >,
    initialState: S,
}, ): ClientStateReducer< S > => {

    return (
        localState: S = initialState,
        action: ClientAction,
        globalState: ClientState,
    ) => {

        const registeredReducer: ?ClientStateActionReducer< S, ClientAction >
            = actionReducers[ action.type ];

        const reducer: ClientStateActionReducer< S, ClientAction >
            = registeredReducer == null
                ? unsupportedActionReducer
                : registeredReducer;

        return reducer(
            {
                action,
                globalState,
                localState,
            },
        );

    };

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

                            },
                        );

                    },
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

                            },
                        );

                    },
                );

            },
        );

};
