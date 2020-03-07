// @flow

import { updateStateMenuReducer } from './update-state';
import { closeCityView } from '../../actions';
import type { ClientState, ClientStateMenu } from '../../state';
import { emptyClientState } from '../../state';
import { closeCityViewMenuReducer } from './close-city-view';

describe('updateStateMenuReducer', () => {
    it('handles close city action', () => {
        const action = closeCityView();
        const previousGlobalState: ClientState = {
            ...emptyClientState,
            menu: {
                ...emptyClientState.menu,
                cityView: {
                    ...emptyClientState.menu.cityView,
                    currentCityId: '1',
                },
            },
        };

        const previousLocalState: ClientStateMenu = previousGlobalState.menu;

        const expected: ClientStateMenu = {
            ...previousLocalState,
            cityView: {
                ...previousLocalState.cityView,
                currentCityId: null,
            },
        };

        const actual = closeCityViewMenuReducer({
            localState: previousLocalState,
            action,
            globalState: previousGlobalState,
        });

        expect(actual).toEqual(expected);
    });
});
