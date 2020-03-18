// @flow

import { citiesReducer } from './cities/reducer';
import { rulesReducer } from './rules/reducer';
import { timeReducer } from './time/reducer';
import { worldReducer } from './world/reducer';
import type { CommonStateCities } from './cities/reducer/types';
import type { CommonStateRules } from './rules/reducer/types';
import type { CommonStateTime } from './time/reducer/types';
import type { CommonStateWorld } from './world/reducer/types';
import type {
    CommonState,
    CommonStateReducer,
    CommonStateReducerResult,
} from './types';
import { emptyCommonState } from './state';
import type { CommonAction } from '../actions/types';

type StateToReducersMapping = {
    cities: CommonStateReducer<CommonStateCities>,
    rules: CommonStateReducer<CommonStateRules>,
    time: CommonStateReducer<CommonStateTime>,
    world: CommonStateReducer<CommonStateWorld>,
};

const combineCommonStateReducers = ({ stateToReducersMapping }: { stateToReducersMapping: StateToReducersMapping }) => {
    const combinedReducer = ({ action, state }: { action: CommonAction, state: CommonState }): CommonStateReducerResult<CommonState> => {
        const reducibleState: CommonState = Object.keys(stateToReducersMapping).reduce(
            (reducibleState, stateProperty: $Keys<StateToReducersMapping>) => {
                return {
                    ...reducibleState,
                    // $FlowFixMe
                    [stateProperty]: state[stateProperty],
                };
            },
            emptyCommonState,
        );

        return Object
            .keys(stateToReducersMapping)
            .reduce((result, stateProperty: string) => {
                    const reducer = stateToReducersMapping[stateProperty];
                    const newPropertyReduceResult = reducer(
                        state[stateProperty],
                        action,
                        state,
                    );

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
                },
            );
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
