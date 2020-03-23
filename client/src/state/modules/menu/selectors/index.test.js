// @flow

import type { ClientState } from '../../types';
import { emptyClientState } from '../../types';
import {
    UNIT_ARCHER,
    UNIT_KNIGHT,
    UNIT_PIKEMAN,
} from '../../../../../../common/src/state/modules/rules/reducer/types';
import { minimumRegimentSizeSelector } from './index';

describe('minimumRegimentSizeSelector', () => {
    it('returns a sum of minimum quantities of each unit', () => {
        const state: ClientState = {
            ...emptyClientState,
            menu: {
                ...emptyClientState.menu,
                attackView: {
                    ...emptyClientState.menu.attackView,
                    regimentTemplate: {
                        [UNIT_PIKEMAN]: {
                            from: 100,
                            to: 200,
                        },
                        [UNIT_ARCHER]: {
                            from: 50,
                            to: 100,
                        },
                        [UNIT_KNIGHT]: {
                            from: 1,
                            to: 2,
                        },
                    },
                },
            },
        };

        const expected: number = 151;

        const actual = minimumRegimentSizeSelector(state);

        expect(actual).toEqual(expected);
    });
});
