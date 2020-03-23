// @flow

import type {
    CommonState,
    CommonStateActionReducer,
    CommonStateReducer,
    CommonStateReducerResult,
    CommonStateReducerTestScenario,
} from './types';
import type { CommonAction, CommonActionKey } from '../types';

export const success = <S>({ state }: { state: S }): CommonStateReducerResult<S> => {
    return {
        state,
        errors: [],
    };
};

export const failure = <S>({ errors }: { errors: $ReadOnlyArray<string> }): CommonStateReducerResult<S> => {
    return {
        state: null,
        errors,
    };
};

type ActionReducers<S> = $ReadOnly<{
    [CommonActionKey]: CommonStateActionReducer<S, CommonAction>, ...
}>;

export const unsupportedActionReducer = <S, A: CommonAction>(
    {
        localState,
        action,
        globalState,
    }: $ReadOnly<{
        localState: S,
        action: A,
        globalState: CommonState,
    }>,
): CommonStateReducerResult<S> => {
    return success({ state: localState });
};

export const createCommonStateReducer = <S>({ actionReducers, initialState }: { actionReducers: ActionReducers<S>, initialState: S }): CommonStateReducer<S> => {
    return (
        localState: S = initialState,
        action: CommonAction,
        globalState: CommonState,
    ) => {
        const registeredReducer: ?CommonStateActionReducer<S, CommonAction> = actionReducers[action.type];
        const reducer: CommonStateActionReducer<S, CommonAction> = registeredReducer != null ?
            registeredReducer :
            unsupportedActionReducer;

        return reducer({
            action,
            globalState,
            localState,
        });
    };
};

type Scenarios<S> = { [CommonActionKey]: $ReadOnlyArray<CommonStateReducerTestScenario<S, CommonAction>>, ... };

export const runTestScenarios = <S>(
    {
        reducer,
        reducerKey,
        scenarios,
    }: {
        reducer: CommonStateReducer<S>,
        reducerKey: string,
        scenarios: Scenarios<S>,
    },
): void => {
    Object.keys(scenarios).forEach(
        (actionKey: CommonActionKey) => {
            describe(actionKey, () => {
                scenarios[actionKey].forEach(
                    (scenario: CommonStateReducerTestScenario<S, CommonAction>) => {
                        it(scenario.name, () => {
                            const previousLocalState = scenario.previousGlobalState[reducerKey];

                            const actual = reducer(
                                previousLocalState,
                                scenario.action,
                                scenario.previousGlobalState,
                            );

                            const expectedReductionResult = scenario.expectedReductionResultCreator({ previousLocalState });

                            expect(actual).toEqual(expectedReductionResult);
                        });
                    },
                );
            });
        },
    );
};
