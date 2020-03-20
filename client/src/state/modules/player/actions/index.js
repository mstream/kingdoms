// @flow


import type { ClientActionCreator } from '../../../actions/types';
import type { BaseAction } from '../../../../../../common/src/state/types';


export const LOAD_PLAYER: 'LOAD_PLAYER' = 'LOAD_PLAYER';


export type ClientLoadPlayerAction = BaseAction<typeof LOAD_PLAYER, $ReadOnly<{ name: string, }>>


export const loadPlayer: ClientActionCreator<ClientLoadPlayerAction> = (payload) => {
    return {
        type: LOAD_PLAYER,
        payload,
    };
};
