// @flow


import type { ClientState, ClientStateSelector } from '../../../types';
import { createSelector } from 'reselect';
import { isAttackViewMenuOpenSelector } from './is-attack-view-menu-open';
import { isCityViewMenuOpenSelector } from './is-city-view-menu-open';

export const isAnyMenuOpenSelector: ClientStateSelector<boolean> =
    createSelector<ClientState, void, boolean, boolean, boolean>(
        isAttackViewMenuOpenSelector,
        isCityViewMenuOpenSelector,
        (isAttackViewMenuOpen, isCityViewMenuOpen) => {
            return isAttackViewMenuOpen || isCityViewMenuOpen;
        },
    );

