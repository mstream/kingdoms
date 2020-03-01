/**
 * @flow
 */

import type {ServerState} from '../../../../common/src/state';
import type {ServerAction} from '../../../../common/src/actions';
import {citiesReducer} from './cities';
import {rulesReducer} from './rules';
import {timeReducer} from './time';
import {worldReducer} from './world';

export type ServerStateReducerResult<S> = {
    errors: $ReadOnlyArray<string>,
    state: ?S,
};

export type ServerStateReducer<S> = ({ action: ServerAction, state: ServerState }) => ServerStateReducerResult<S>;

export const success = <S>({state}: { state: S }): ServerStateReducerResult<S> => {
    return {
        state,
        errors: [],
    };
};

export const failure = <S>({errors}: { errors: $ReadOnlyArray<string> }): ServerStateReducerResult<S> => {
    return {
        state: null,
        errors,
    };
};

const combineServerStateReducers = ({stateToReducersMapping}) => {
    const combinedReducer: ServerStateReducer<ServerState> = ({action, state}) => {
        return Object
            .keys(stateToReducersMapping)
            .reduce((result, stateProperty: string) => {
                    const reducer = stateToReducersMapping[stateProperty];
                    const newPropertyReduceResult = reducer({
                        action,
                        state: result.state
                    });

                    return {
                        errors: [
                            ...result.errors,
                            ...newPropertyReduceResult.errors,
                        ],
                        state: {
                            ...result.state,
                            [stateProperty]: newPropertyReduceResult.state,
                        }
                    };
                },
                {errors: [], state});
    };
    return combinedReducer;
};

export const rootReducer = combineServerStateReducers({
    stateToReducersMapping: {
        cities: citiesReducer,
        rules: rulesReducer,
        time: timeReducer,
        world: worldReducer,
    }
});
