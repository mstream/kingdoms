/**
 * @flow
 */

import type {ServerState} from '../../../../common/src/state';
import type {ServerAction} from '../../../../common/src/actions';
import {citiesReducer} from './cities';
import {timeReducer} from './time';
import {worldSizeReducer} from './worldSize';
import {rulesReducer} from './rules';

export type ServerStateReducer<S> = ({ action: ServerAction, state: ServerState }) => S

const combineServerStateReducers = ({stateToReducersMapping}) => {
    const combinedReducer: ServerStateReducer<ServerState> = ({action, state}) => {
        return Object
            .keys(stateToReducersMapping)
            .reduce((newState, stateProperty: string) => {
                    const reducer = stateToReducersMapping[stateProperty];
                    const newPropertyState = reducer({action, state: newState});
                    return {
                        ...newState,
                        [stateProperty]: newPropertyState,
                    };
                },
                state);
    };
    return combinedReducer;
};

export const rootReducer = combineServerStateReducers({
    stateToReducersMapping: {
        cities: citiesReducer,
        rules: rulesReducer,
        time: timeReducer,
        worldSize: worldSizeReducer,
    }
});

