// @flow

import type {
    DatabaseTestScenario,
    SideEffect,
    ValueDeserializer,
    ValueSerializer,
} from './types';
import {
    expectCalls,
} from '../../../../common/src/test-utils';
import type {
    Jest,
} from '../../../../common/src/test-utils/types';

export const stringValueSerializer: ValueSerializer< string > = (
    {
        value,
    },
) => {

    return value;

};

export const stringValueDeserializer: ValueDeserializer< string > = (
    {
        serializedValue,
    },
) => {

    return serializedValue;

};

export const runDatabaseOperationTestScenarios = <A, R>( {
    jest,
    operationFunction,
    scenarios,
}: $ReadOnly< {|
                                                            jest: Jest,
                                                            operationFunction: ( A ) => Promise< R >,
                                                            scenarios: $ReadOnlyArray< DatabaseTestScenario< A, R > >
                                                        |} >,
): void => {

    scenarios.forEach(
        (
            scenario: DatabaseTestScenario< A, R >,
        ) => {

            jest.it(
                scenario.name,
                async () => {

                    const {
                        args, expectations,
                    } = scenario.create();

                    const noExpectations
                        = !Object.keys(
                            expectations,
                        )
                            .includes(
                                `result`,
                            ) && !Object.keys(
                            expectations,
                        )
                            .includes(
                                `error`,
                            );

                    const contradictoryExpectations
                        = Object.keys(
                            expectations,
                        )
                            .includes(
                                `result`,
                            ) && Object.keys(
                            expectations,
                        )
                            .includes(
                                `error`,
                            );

                    if ( noExpectations || contradictoryExpectations ) {

                        throw Error(
                            `there should be exactly one of either result or error expectation`,
                        );

                    }

                    const actualPromise = operationFunction(
                        args,
                    );

                    if ( expectations.result != null ) {

                        expect(
                            await actualPromise,
                        )
                            .toEqual(
                                expectations.result,
                            );

                    }

                    if ( expectations.error != null ) {

                        await expect(
                            actualPromise,
                        ).rejects.toEqual(
                            expectations.error,
                        );

                    }

                    expectations.sideEffects.forEach(
                        (
                            sideEffect: SideEffect,
                        ) => {

                            expectCalls(
                                {
                                    calls       : sideEffect.calls,
                                    expect,
                                    mockFunction: sideEffect.mockFunction,
                                },
                            );

                        },
                    );

                },
            );

        },
    );

};
