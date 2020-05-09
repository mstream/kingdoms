// @flow

import type {
    ClientAction,
    ClientActionKey,
    ClientStateReducer,
    ClientStateReducerTestScenario,


    ReducerScenarios,
} from '../types';
import type {
    Jest,
} from '../../../../../../common/src/test-utils/types';

type Scenario<S> = ClientStateReducerTestScenario< S, ClientAction >;
type Scenarios<S> = $ReadOnlyArray< Scenario< S > >;

const runReducerTestScenario = <S>( {
    jest,
    reducer,
    reducerKey,
    scenario,
}: {
    jest: Jest,
    reducer: ClientStateReducer< S >,
    reducerKey: string,
    scenario: Scenario< S >,
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
        scenarios: Scenarios< S >
    },
) => {

    scenarios.forEach(
        (
            scenario: Scenario< S >,
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

export const generateReducerTests = <S>(
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
