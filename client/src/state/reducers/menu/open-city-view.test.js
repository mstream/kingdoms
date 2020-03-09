// @flow

import { updateStateMenuReducer } from './update-state';
import { closeCityView, openCityView } from '../../actions';
import type { ClientState, ClientStateMenu } from '../../state';
import { emptyClientState, TAB_OVERVIEW, TAB_UNITS } from '../../state';
import { closeCityViewMenuReducer } from './close-city-view';
import {
    emptyCityState,
    emptyCommonState,
} from '../../../../../common/src/state';
import { menuReducer } from './index';

describe('updateStateMenuReducer', () => {
    it('handles open city action', () => {
        const action = openCityView({ cityId: '1' });
        const previousGlobalState: ClientState = {
            ...emptyClientState,
            player: {
                name: 'player1',
            },
            commonState: {
                ...emptyCommonState,
                cities: {
                    '1': {
                        ...emptyCityState,
                        ownerId: 'player1',
                    },
                },
            },
            menu: {
                ...emptyClientState.menu,
                cityView: {
                    ...emptyClientState.menu.cityView,
                    currentCityId: null,
                },
            },
        };
        const previousLocalState: ClientStateMenu = previousGlobalState.menu;
        const expected: ClientStateMenu = {
            ...previousLocalState,
            cityView: {
                currentCityId: '1',
                tab: TAB_OVERVIEW,
            },
        };

        const actual = menuReducer(previousLocalState, action, previousGlobalState);

        expect(actual).toEqual(expected);
    });
});
