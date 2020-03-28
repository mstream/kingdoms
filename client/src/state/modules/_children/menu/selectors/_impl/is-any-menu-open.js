// @flow


import { createSelector } from 'reselect';
import { isAttackViewMenuOpenSelector } from './is-attack-view-menu-open';
import { isCityViewMenuOpenSelector } from './is-city-view-menu-open';
import type { ClientState, ClientStateSelector } from '../../../../../types';

export const isAnyMenuOpenSelector: ClientStateSelector<boolean> =
    createSelector<ClientState, void, boolean, boolean, boolean>(
        isAttackViewMenuOpenSelector,
        isCityViewMenuOpenSelector,
        (isAttackViewMenuOpen, isCityViewMenuOpen) => {
            return isAttackViewMenuOpen || isCityViewMenuOpen;
        },
    );

