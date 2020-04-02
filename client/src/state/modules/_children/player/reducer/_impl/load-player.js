// @flow

import type { ClientStatePlayer } from '../types';
import type { ClientLoadPlayerAction } from '../../actions/types';
import type { ClientStateActionReducer } from '../../../../../types';

type Reducer = ClientStateActionReducer<
    ClientStatePlayer,
    ClientLoadPlayerAction,
>;

export const loadPlayerPlayerReducer: Reducer = ({
    action,
    globalState,
    localState,
}) => {
    return {
        ...localState,
        name: action.payload.name,
    };
};
