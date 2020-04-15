// @flow

import type {
    ActionReducers,
    ClientAction,
    ClientState,
    ClientStateActionReducer,
    ClientStateReducer,
} from './types';

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

