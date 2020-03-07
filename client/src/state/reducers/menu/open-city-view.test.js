// @flow

import { updateStateMenuReducer } from './update-state';
import { closeCityView, openCityView } from '../../actions';
import type { ClientState, ClientStateMenu } from '../../state';
import { emptyClientState } from '../../state';
import { closeCityViewMenuReducer } from './close-city-view';
import {
    emptyCityState,
    emptyServerState,
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
            serverState: {
                ...emptyServerState,
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
                    currentCityId: null,
                },
            },
        };
        const previousLocalState: ClientStateMenu = previousGlobalState.menu;
        const expected: ClientStateMenu = {
            ...previousLocalState,
            cityView: {
                currentCityId: '1',
            },
        };

        const actual = menuReducer(previousLocalState, action, previousGlobalState);

        expect(actual).toEqual(expected);
    });
});
