// @flow

import {
    closeCityView,
    navigateToNextCity,
    navigateToPreviousCity,
    openCityView,
    requestCityCreation
} from '../actions';
import {menuReducer} from './menu';
import type {ClientState, ClientStateMenu} from '../state';
import {emptyClientState, initialClientState} from '../state';
import {
    emptyCityState,
    emptyServerState
} from '../../../../server/src/state/state';

describe('menuReducer', () => {
    it('initializes its state', () => {
        const action = {
            type: '_DUMMY_',
        };

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
                    currentCityId: '2',
                    nextCityId: '3',
                    previousCityId: '1',
                }
            }
        };
        const previousLocalState: ClientStateMenu = previousGlobalState.menu;
        const expected: ClientStateMenu = {
            ...previousLocalState,
            cityView: {
                ...previousLocalState.cityView,
                currentCityId: null,
                nextCityId: null,
                previousCityId: null,
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
            serverState: {
                ...emptyServerState,
                citiesByOwner: {
                    'player1': ['1', '2', '3']
                },
            },
            menu: {
                ...emptyClientState.menu,
                cityView: {
                    currentCityId: null,
                    nextCityId: null,
                    previousCityId: null,
                }
            }
        };
        const previousLocalState: ClientStateMenu = previousGlobalState.menu;
        const expected: ClientStateMenu = {
            ...previousLocalState,
            cityView: {
                currentCityId: '1',
                nextCityId: '2',
                previousCityId: '3',
            }
        };
        const actual = menuReducer(previousLocalState, action, previousGlobalState);
        expect(actual).toEqual(expected);
    });

    it('handles navigate to next city event', () => {
        const action = navigateToNextCity();
        const previousGlobalState: ClientState = {
            ...emptyClientState,
            player: {
                name: 'player1',
            },
            serverState: {
                ...emptyServerState,
                citiesByOwner: {
                    'player1': ['1', '2', '3']
                },
            },
            menu: {
                ...emptyClientState.menu,
                cityView: {
                    currentCityId: '1',
                    nextCityId: '2',
                    previousCityId: '3',
                }
            }
        };
        const previousLocalState: ClientStateMenu = previousGlobalState.menu;
        const expected: ClientStateMenu = {
            ...previousLocalState,
            cityView: {
                currentCityId: '2',
                nextCityId: '3',
                previousCityId: '1',
            }
        };
        const actual = menuReducer(previousLocalState, action, previousGlobalState);
        expect(actual).toEqual(expected);
    });

    it('handles navigate to previous city event', () => {
        const action = navigateToPreviousCity();
        const previousGlobalState: ClientState = {
            ...emptyClientState,
            player: {
                name: 'player1',
            },
            serverState: {
                ...emptyServerState,
                citiesByOwner: {
                    'player1': ['1', '2', '3']
                },
            },
            menu: {
                ...emptyClientState.menu,
                cityView: {
                    currentCityId: '1',
                    nextCityId: '2',
                    previousCityId: '3',
                }
            }
        };
        const previousLocalState: ClientStateMenu = previousGlobalState.menu;
        const expected: ClientStateMenu = {
            ...previousLocalState,
            cityView: {
                currentCityId: '3',
                nextCityId: '1',
                previousCityId: '2',
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
                    isOpen: true,
                    isCityBeingCreated: false,
                }
            }
        };
        const previousLocalState: ClientStateMenu = previousGlobalState.menu;
        const expected: ClientStateMenu = {
            ...previousLocalState,
            newCity: {
                ...previousLocalState.newCity,
                isOpen: true,
                isCityBeingCreated: true,
            }
        };
        const actual = menuReducer(previousLocalState, action, previousGlobalState);
        expect(actual).toEqual(expected);
    });
});
