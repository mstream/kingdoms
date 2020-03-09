// @flow

import type {
    CommonStateCities,
    CommonStateRules,
    CommonStateTime,
    CommonStateWorld,
    CommonState,
} from '../../../../common/src/state';
import type { ServerAction } from '../../../../common/src/actions';
import { citiesReducer } from './cities';
import { rulesReducer } from './rules';
import { timeReducer } from './time';
import { worldReducer } from './world';

export type CommonstateReducerResult<S> = {
    errors: $ReadOnlyArray<string>,
    state: ?S,
};

export type CommonstateReducer<S> = ({ action: ServerAction, state: CommonState }) => CommonstateReducerResult<S>;

export const success = <S>({ state }: { state: S }): CommonstateReducerResult<S> => {
    return {
        state,
        errors: [],
    };
};

export const failure = <S>({ errors }: { errors: $ReadOnlyArray<string> }): CommonstateReducerResult<S> => {
    return {
        state: null,
        errors,
    };
};

type StateToReducersMapping = {
    cities: CommonstateReducer<CommonStateCities>,
    rules: CommonstateReducer<CommonStateRules>,
    time: CommonstateReducer<CommonStateTime>,
    world: CommonstateReducer<CommonStateWorld>,
};

const combineCommonstateReducers = ({ stateToReducersMapping }: { stateToReducersMapping: StateToReducersMapping }) => {
    const combinedReducer: CommonstateReducer<CommonState> = ({ action, state }) => {
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


export const rootReducer = combineCommonstateReducers({ stateToReducersMapping });
