// @flow

import { selectCityViewTab } from '../../actions';
import type { ClientState, ClientStateMenu } from '../../state';
import { emptyClientState, TAB_BUILDINGS, TAB_UNITS } from '../../state';
import { selectCityViewTabMenuReducer } from './select-city-view-tab';

describe('selectCityViewTabMenuReducer', () => {
    it('handles open city action', () => {
        const action = selectCityViewTab({ tab: TAB_UNITS });

        const previousGlobalState: ClientState = {
            ...emptyClientState,
            menu: {
                ...emptyClientState.menu,
                cityView: {
                    ...emptyClientState.menu.cityView,
                    tab: TAB_BUILDINGS,
                },
            },
        };

        const previousLocalState: ClientStateMenu = previousGlobalState.menu;

        const expected: ClientStateMenu = {
            ...previousLocalState,
            cityView: {
                ...previousLocalState.cityView,
                tab: TAB_UNITS,
            },
        };

        const actual = selectCityViewTabMenuReducer({
            localState: previousLocalState,
            action,
            globalState: previousGlobalState,
        });

        expect(actual).toEqual(expected);
    });
});
