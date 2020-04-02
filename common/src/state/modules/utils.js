// @flow

import type {
    CommonState,
    CommonStateActionReducer,
    CommonStateReducer,
    CommonStateReducerResult,
    CommonStateReducerTestScenario,
    CommonStateSelector,
    CommonStateSelectors,
    CommonStateSelectorTestScenario,
} from './types';
import type { CommonAction, CommonActionKey } from '../types';

export const success = <S>({
    state,
}: {
    state: S,
}): CommonStateReducerResult<S> => {
    return {
        state,
        errors: [],
    };
};

export const failure = <S>({
    errors,
}: {
    errors: $ReadOnlyArray<string>,
}): CommonStateReducerResult<S> => {
    return {
        state: null,
        errors,
    };
};

type ActionReducers<S> = $ReadOnly<{
    [CommonActionKey]: CommonStateActionReducer<S, CommonAction>,
}>;

export const unsupportedActionReducer = <S, A: CommonAction>({
    localState,
    action,
    globalState,
}: $ReadOnly<{
    localState: S,
    action: A,
    globalState: CommonState,
}>): CommonStateReducerResult<S> => {
    return success({ state: localState });
};

export const createCommonStateReducer = <S>({
    actionReducers,
    initialState,
}: {
    actionReducers: ActionReducers<S>,
    initialState: S,
}): CommonStateReducer<S> => {
    return (
        localState: S = initialState,
        action: CommonAction,
        globalState: CommonState,
    ) => {
        const registeredReducer: ?CommonStateActionReducer<S, CommonAction> =
            actionReducers[action.type];
        const reducer: CommonStateActionReducer<S, CommonAction> =
            registeredReducer != null
                ? registeredReducer
                : unsupportedActionReducer;

        return reducer({
            action,
            globalState,
            localState,
        });
    };
};

type Scenarios<S> = {
    [CommonActionKey]: $ReadOnlyArray<
        CommonStateReducerTestScenario<S, CommonAction>,
    >,
};

type SelectorScenarios = $ReadOnly<{
    [string]: $ReadOnlyArray<CommonStateSelectorTestScenario<mixed>>,
    ...,
}>;

export const runTestScenarios = <S>({
    reducer,
    reducerKey,
    scenarios,
}: {
    reducer: CommonStateReducer<S>,
    reducerKey: string,
    scenarios: Scenarios<S>,
}): void => {
    Object.keys(scenarios).forEach((actionKey: CommonActionKey) => {
        describe(actionKey, () => {
            scenarios[actionKey].forEach(
                (scenario: CommonStateReducerTestScenario<S, CommonAction>) => {
                    it(scenario.name, () => {
                        const previousLocalState =
                            scenario.previousGlobalState[reducerKey];

                        const actual = reducer(
                            previousLocalState,
                            scenario.action,
                            scenario.previousGlobalState,
                        );

                        const expectedReductionResult = scenario.expectedReductionResultCreator(
                            { previousLocalState },
                        );

                        expect(actual).toEqual(expectedReductionResult);
                    });
                },
            );
        });
    });
};

export const runCommonStateSelectorsTestScenarios = ({
    moduleSelectors,
    scenarios,
}: {
    moduleSelectors: CommonStateSelectors,
    scenarios: SelectorScenarios,
}): void => {
    Object.keys(scenarios).forEach((selectorKey: string) => {
        describe(selectorKey, () => {
            const scenariosForSelector = scenarios[selectorKey];

            scenariosForSelector.forEach(
                (scenario: CommonStateSelectorTestScenario<mixed>) => {
                    const selector: CommonStateSelector<mixed> =
                        moduleSelectors[selectorKey];

                    if (selector == null) {
                        throw Error(`selector '${selectorKey}' is missing`);
                    }

                    it(scenario.name, () => {
                        const state: CommonState = scenario.state;
                        const expected: mixed = scenario.expectedValue;

                        const actual: mixed = selector(state);

                        expect(actual).toEqual(expected);
                    });
                },
            );
        });
    });
};
