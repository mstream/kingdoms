// @flow
import type { ClientAction } from '../../actions';
import { UPDATE_STATE } from '../../actions';
import type { ClientState } from '../root';
import { unsupportedActionReducer } from '../unsupported-action-reducer';
import { updateStateCommonStateReducer } from './update-state';
import type { ClientStateCommonState } from './types';

export const initialCommonStateState = null;

export const commonStateReducer = (
    localState: ClientStateCommonState = initialCommonStateState,
    action: ClientAction,
    globalState: ClientState,
): ClientStateCommonState => {
    switch (action.type) {
        case UPDATE_STATE: {
            return updateStateCommonStateReducer({
                action,
                globalState,
                localState,
            });
        }
        default: {
            return unsupportedActionReducer({
                action,
                globalState,
                localState,
            });
        }
    }
};
