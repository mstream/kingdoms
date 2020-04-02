// @flow

import type { BaseAction } from '../../../../../../../common/src/types/actions';

export const LOAD_PLAYER: 'LOAD_PLAYER' = 'LOAD_PLAYER';

export type ClientLoadPlayerAction = BaseAction<
    typeof LOAD_PLAYER,
    $ReadOnly<{ name: string }>,
>;
