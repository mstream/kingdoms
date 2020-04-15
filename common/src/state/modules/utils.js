// @flow

import type {
    CommonState,
    CommonStateActionReducer,
    CommonStateReducer,
    CommonStateReducerResult,
} from './types';
import type {
    CommonAction, CommonActionKey,
} from '../types';

export const success = <S>( {
    state,
}: {
    state: S,
}, ): CommonStateReducerResult< S > => {

    return {
        errors: [],
        state,
    };

};

export const failure = <S>( {
    errors,
}: {
    errors: $ReadOnlyArray< string >,
}, ): CommonStateReducerResult< S > => {

    return {
        errors,
        state: null,
    };

};

type ActionReducers<S> = $ReadOnly< {
    [CommonActionKey]: CommonStateActionReducer< S, CommonAction >,
} >;

export const unsupportedActionReducer = <S, A: CommonAction>( {
    localState,


}: $ReadOnly< {
    localState: S,
    action: A,
    globalState: CommonState,
} >, ): CommonStateReducerResult< S > => {

    return success(
        {
            state: localState,
        },
    );

};

export const createCommonStateReducer = <S>( {
    actionReducers,
    initialState,
}: {
    actionReducers: ActionReducers< S >,
    initialState: S,
}, ): CommonStateReducer< S > => {

    return (
        localState: S = initialState,
        action: CommonAction,
        globalState: CommonState,
    ) => {

        const registeredReducer: ?CommonStateActionReducer< S, CommonAction >
            = actionReducers[ action.type ];

        const reducer: CommonStateActionReducer< S, CommonAction >
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

