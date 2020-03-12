// @flow

import type { ServerAction } from '../../../../common/src/actions';
import { citiesReducer } from './cities';
import { rulesReducer } from './rules';
import { timeReducer } from './time';
import { worldReducer } from './world';
import type {
    CommonState, CommonStateCities,
    CommonStateRules,
    CommonStateTime,
    CommonStateWorld,
} from '../index';

export type CommonStateReducerResult<S> = {
    errors: $ReadOnlyArray<string>,
    state: ?S,
};

export type CommonStateReducer<S> = ({ action: ServerAction, state: CommonState }) => CommonStateReducerResult<S>;

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

type StateToReducersMapping = {
    cities: CommonStateReducer<CommonStateCities>,
    rules: CommonStateReducer<CommonStateRules>,
    time: CommonStateReducer<CommonStateTime>,
    world: CommonStateReducer<CommonStateWorld>,
};

const combineCommonStateReducers = ({ stateToReducersMapping }: { stateToReducersMapping: StateToReducersMapping }) => {
    const combinedReducer: CommonStateReducer<CommonState> = ({ action, state }) => {
        const reducibleState: CommonState = Object.keys(stateToReducersMapping).reduce(
            (reducibleState, stateProperty: $Keys<StateToReducersMapping>) => {
                return {
                    ...reducibleState,
                    // $FlowFixMe
                    [stateProperty]: state[stateProperty],
                };
            },
            {},
        );
        return Object
            .keys(stateToReducersMapping)
            .reduce((result, stateProperty: string) => {
                    const reducer = stateToReducersMapping[stateProperty];
                    const newPropertyReduceResult = reducer({
                        action,
                        state: result.state,
                    });

                    return {
                        errors: [
                            ...result.errors,
                            ...newPropertyReduceResult.errors,
                        ],
                        state: {
                            ...result.state,
                            [stateProperty]: newPropertyReduceResult.state,
                        },
                    };
                },
                {
                    errors: [],
                    state: reducibleState,
                });
    };
    return combinedReducer;
};

const stateToReducersMapping: StateToReducersMapping = {
    cities: citiesReducer,
    rules: rulesReducer,
    time: timeReducer,
    world: worldReducer,
};


export const rootReducer = combineCommonStateReducers({ stateToReducersMapping });
