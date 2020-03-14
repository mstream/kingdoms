// @flow


import type { ClientActionCreator, ClientBaseAction } from '../../types';


export const LOAD_PLAYER: 'LOAD_PLAYER' = 'LOAD_PLAYER';


export type ClientLoadPlayerAction = ClientBaseAction<typeof LOAD_PLAYER, $ReadOnly<{ name: string, }>>


export const loadPlayer: ClientActionCreator<ClientLoadPlayerAction> = (payload) => {
    return {
        type: LOAD_PLAYER,
        payload,
    };
};
