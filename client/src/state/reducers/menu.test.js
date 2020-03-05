// @flow

import {
    closeCityView,
    dummy,
    openCityView,
    requestCityCreation
} from '../actions';
import {menuReducer} from './menu';
import type {ClientState, ClientStateMenu} from '../state';
import {emptyClientState, initialClientState} from '../state';
import {emptyServerState} from '../../../../server/src/state/state';

describe('menuReducer', () => {
    it('initializes its state', () => {
        const action = dummy();

        const previousGlobalState: ClientState = {
            ...emptyClientState,
        };

        // $FlowFixMe
        const previousLocalState: ClientStateMenu = undefined;

        const expected: ?ClientStateMenu = {
            ...initialClientState.menu,
        };

        const actual = menuReducer(previousLocalState, action, previousGlobalState);

        expect(actual).toEqual(expected);
    });

    it('handles close city view window event', () => {
        const action = closeCityView();
        const previousGlobalState: ClientState = {
            ...emptyClientState,
            menu: {
                ...emptyClientState.menu,
                cityView: {
                    ...emptyClientState.menu.cityView,
                    currentCityId: '1',
                }
            }
        };
        const previousLocalState: ClientStateMenu = previousGlobalState.menu;
        const expected: ClientStateMenu = {
            ...previousLocalState,
            cityView: {
                ...previousLocalState.cityView,
                currentCityId: null,
            }
        };
        const actual = menuReducer(previousLocalState, action, previousGlobalState);
        expect(actual).toEqual(expected);
    });

    it('handles open city view event', () => {
        const action = openCityView({cityId: '1'});
        const previousGlobalState: ClientState = {
            ...emptyClientState,
            player: {
                name: 'player1',
            },
            menu: {
                ...emptyClientState.menu,
                cityView: {
                    currentCityId: null,
                }
            }
        };
        const previousLocalState: ClientStateMenu = previousGlobalState.menu;
        const expected: ClientStateMenu = {
            ...previousLocalState,
            cityView: {
                currentCityId: '1',
            }
        };
        const actual = menuReducer(previousLocalState, action, previousGlobalState);
        expect(actual).toEqual(expected);
    });

    it('handles request city creation event', () => {
        const action = requestCityCreation({name: 'Abc',});
        const previousGlobalState: ClientState = {
            ...emptyClientState,
            menu: {
                ...emptyClientState.menu,
                newCity: {
                    ...emptyClientState.menu.newCity,
                    isCityBeingCreated: false,
                }
            }
        };
        const previousLocalState: ClientStateMenu = previousGlobalState.menu;
        const expected: ClientStateMenu = {
            ...previousLocalState,
            newCity: {
                ...previousLocalState.newCity,
                isCityBeingCreated: true,
            }
        };
        const actual = menuReducer(previousLocalState, action, previousGlobalState);
        expect(actual).toEqual(expected);
    });
});
