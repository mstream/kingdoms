// @flow

import type { ClientAction, ClientActionKey } from '../types';
import type {
    ClientState,
    ClientStateActionReducer,
    ClientStateReducer,
    ClientStateReducerTestScenario,
} from './types';

export type ActionReducers<S> = $ReadOnly<{
    [ClientActionKey]: ClientStateActionReducer<S, ClientAction>, ...
}>;

type Scenarios<S> = { [ClientActionKey]: $ReadOnlyArray<ClientStateReducerTestScenario<S, ClientAction>>, ... };

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


export const runTestScenarios = <S>(
    {
        reducer,
        reducerKey,
        scenarios,
    }: {
        reducer: ClientStateReducer<S>,
        reducerKey: string,
        scenarios: Scenarios<S>,
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
