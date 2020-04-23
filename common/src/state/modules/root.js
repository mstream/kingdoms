// @flow

import {
    citiesReducer,
} from './_children/cities/reducer';
import {
    emptyCommonState,
} from './state';
import {
    ordersReducer,
} from './_children/orders/reducer';
import {
    rulesReducer,
} from './_children/rules/reducer';
import {
    timeReducer,
} from './_children/time/reducer';
import {
    worldReducer,
} from './_children/world/reducer';
import type {
    CommonAction,
} from '../types';
import type {
    CommonState,
    CommonStateReducer,
    CommonStateReducerResult,
} from './types';
import type {
    CommonStateCities,
} from './_children/cities/reducer/types';
import type {
    CommonStateOrders,
} from './_children/orders/reducer/types';
import type {
    CommonStateRules,
} from './_children/rules/reducer/types';
import type {
    CommonStateTime,
} from './_children/time/reducer/types';
import type {
    CommonStateWorld,
} from './_children/world/reducer/types';

type StateToReducersMapping = {
    cities: CommonStateReducer< CommonStateCities >,
    orders: CommonStateReducer< CommonStateOrders >,
    rules: CommonStateReducer< CommonStateRules >,
    time: CommonStateReducer< CommonStateTime >,
    world: CommonStateReducer< CommonStateWorld >,
};

const combineCommonStateReducers = (
    {
        stateToReducersMapping,
    }: {
    stateToReducersMapping: StateToReducersMapping,
},
) => {

    const combinedReducer = (
        {
            action,
            state,
        }: {
        action: CommonAction,
        state: CommonState,
    },
    ): CommonStateReducerResult< CommonState > => {

        const reducibleState: CommonState = Object.keys(
            stateToReducersMapping,
        )
            .reduce(
                (
                    reducibleState, stateProperty: $Keys< StateToReducersMapping >,
                ) => {

                    return {
                        ...reducibleState,

                        // $FlowFixMe
                        [ stateProperty ]: state[ stateProperty ],
                    };

                },
                emptyCommonState,
            );

        return Object.keys(
            stateToReducersMapping,
        )
            .reduce(
                (
                    result, stateProperty: string,
                ) => {

                    const reducer = stateToReducersMapping[ stateProperty ];
                    const newPropertyReduceResult = reducer(
                        state[ stateProperty ],
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
                            [ stateProperty ]: newPropertyReduceResult.state,
                        },
                    };

                },
                {
                    errors: [],
                    state : reducibleState,
                },
            );

    };

    return combinedReducer;

};

const stateToReducersMapping: StateToReducersMapping = {
    cities: citiesReducer,
    orders: ordersReducer,
    rules : rulesReducer,
    time  : timeReducer,
    world : worldReducer,
};

export const rootReducer = combineCommonStateReducers(
    {
        stateToReducersMapping,
    },
);
