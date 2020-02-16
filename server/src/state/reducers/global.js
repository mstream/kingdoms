/**
 * @flow
 */
import type {Reducer} from 'redux';
import type {ServerState} from '../../../../common/src/types';
import type {ServerAction} from '../actions';

export const globalReducer: Reducer<?ServerState, ServerAction> = (
    state,
    action
) => {
    return state;
};
