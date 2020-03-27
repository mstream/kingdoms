// @flow

import type { ClientAction, ClientActionKey } from '../types';
import type {
    ClientState,
    ClientStateActionReducer,
    ClientStateReducer,
    ClientStateReducerTestScenario,
    ClientStateSelector,
    ClientStateSelectors,
    ClientStateSelectorTestScenario,
} from './types';

export type ActionReducers<S> = $ReadOnly<{
    [ClientActionKey]: ClientStateActionReducer<S, ClientAction>, ...
}>;

type ReducerScenarios<S> = { [ClientActionKey]: $ReadOnlyArray<ClientStateReducerTestScenario<S, ClientAction>>, ... };
type SelectorScenarios = $ReadOnly<{
    [string]: $ReadOnlyArray<ClientStateSelectorTestScenario<mixed>>,
    ...
}>;

const unsupportedActionReducer = <S, A: ClientAction>(
    {
        localState,
        action,
        globalState,
    }: $ReadOnly<{
        localState: S,
        action: A,
        globalState: ClientState,
    }>,
): S => {
    return localState;
};

export const createClientStateReducer = <S>({ actionReducers, initialState }: { actionReducers: ActionReducers<S>, initialState: S }): ClientStateReducer<S> => {
    return (
        localState: S = initialState,
        action: ClientAction,
        globalState: ClientState,
    ) => {
        const registeredReducer: ?ClientStateActionReducer<S, ClientAction> = actionReducers[action.type];
        const reducer: ClientStateActionReducer<S, ClientAction> = registeredReducer != null ?
            registeredReducer :
            unsupportedActionReducer;

        return reducer({
            action,
            globalState,
            localState,
        });
    };
};


export const runReducerTestScenarios = <S>(
    {
        reducer,
        reducerKey,
        scenarios,
    }: {
        reducer: ClientStateReducer<S>,
        reducerKey: string,
        scenarios: ReducerScenarios<S>,
    },
): void => {
    Object.keys(scenarios).forEach(
        (actionKey: ClientActionKey) => {
            describe(actionKey, () => {
                scenarios[actionKey].forEach(
                    (scenario: ClientStateReducerTestScenario<S, ClientAction>) => {
                        it(scenario.name, () => {
                            const previousLocalState = scenario.previousGlobalState[reducerKey];

                            const actual = reducer(
                                previousLocalState,
                                scenario.action,
                                scenario.previousGlobalState,
                            );

                            const expectedReductionResult = scenario.expectedLocalStateCreator({ previousLocalState });

                            expect(actual).toEqual(expectedReductionResult);
                        });
                    },
                );
            });
        },
    );
};


export const runClientStateSelectorsTestScenarios = (
    {
        moduleSelectors,
        scenarios,
    }: {
        moduleSelectors: ClientStateSelectors,
        scenarios: SelectorScenarios,
    },
): void => {
    Object.keys(scenarios).forEach(
        (selectorKey: string) => {
            describe(selectorKey, () => {
                const scenariosForSelector = scenarios[selectorKey];

                scenariosForSelector.forEach(
                    (scenario: ClientStateSelectorTestScenario<mixed>) => {
                        const selector: ClientStateSelector<mixed> = moduleSelectors[selectorKey];

                        if (selector == null) {
                            throw Error(`selector '${selectorKey}' is missing`);
                        }

                        it(scenario.name, () => {
                            const state: ClientState = scenario.state;
                            const expected: mixed = scenario.expectedValue;

                            const actual: mixed = selector(state);

                            expect(actual).toEqual(expected);
                        });
                    },
                );
            });
        },
    );
};
