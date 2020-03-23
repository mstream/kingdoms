// @flow

import type { ClientStateMenu } from './types';
import type { ClientState, ClientStateActionReducer } from '../../types';
import type {
    ClientSelectAttackViewAttackingCityAction,
    ClientSelectCityViewResourceTabAction,
} from '../actions/types';

type Reducer = ClientStateActionReducer<ClientStateMenu, ClientSelectCityViewResourceTabAction>;


export const selectCityViewResourcesTabMenuReducer: Reducer = (
    {
        localState,
        action,
        globalState,
    }
    )=> {
    return {
        ...localState,
        cityView: {
            ...localState.cityView,
            resource: action.payload.resourceType,
        },
    };
};
