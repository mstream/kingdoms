// @flow

export const PLAYER_STATUS_PLAYING: 'PLAYER_STATUS_PLAYING'
    = `PLAYER_STATUS_PLAYING`;
export const PLAYER_STATUS_DEFEATED: 'PLAYER_STATUS_DEFEATED'
    = `PLAYER_STATUS_DEFEATED`;

export type CommonStatePlayerStatus =
    | typeof PLAYER_STATUS_DEFEATED
    | typeof PLAYER_STATUS_PLAYING;

export type CommonStatePlayers = $ReadOnly< {
    [string]: CommonStatePlayerStatus,
} >;
