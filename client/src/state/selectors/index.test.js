// @flow

import {
    activeCityTabSelector,
    citiesSelector, cityDistancesSelector,
    cityIdsOwnedByPlayerSelector,
    currentlyViewedCitySelector,
    isGameStartingSelector,
} from './index';
import type {
    CommonStateCities,
    CommonStateCity,
} from '../../../../common/src/state';
import {
    emptyCityState,
    emptyCommonState,
} from '../../../../common/src/state';
import type { ClientStateCityViewTab } from '../modules/menu/reducer/types';
import { TAB_UNITS } from '../modules/menu/reducer/types';
import { emptyClientState } from '../modules/types';
import type { ClientState } from '../modules/root';

describe('citiesSelector', () => {
    it('returns all the cities', () => {
        const state: ClientState = {
            ...emptyClientState,
            commonState: {
                ...emptyCommonState,
                cities: {
                    '1': {
                        ...emptyCityState,
                    },
                    '2': {
                        ...emptyCityState,
                    },
                },
            },
        };

        const expected: ?CommonStateCities = {
            '1': {
                ...emptyCityState,
            },
            '2': {
                ...emptyCityState,
            },
        };

        const actual = citiesSelector(state);

        expect(actual).toEqual(expected);
    });
});

describe('activeCityTabSelector', () => {
    it('returns the active tab', () => {
        const state: ClientState = {
            ...emptyClientState,
            menu: {
                ...emptyClientState.menu,
                cityView: {
                    ...emptyClientState.menu.cityView,
                    tab: TAB_UNITS,
                },
            },
        };

        const expected: ClientStateCityViewTab = TAB_UNITS;

        const actual = activeCityTabSelector(state);

        expect(actual).toEqual(expected);
    });
});

describe('currentlyViewedCitySelector', () => {
    it('returns null if no city is viewed', () => {
        const state: ClientState = {
            ...emptyClientState,
            menu: {
                ...emptyClientState.menu,
                cityView: {
                    ...emptyClientState.menu.cityView,
                    currentCityId: null,
                },
            },
            commonState: {
                ...emptyCommonState,
                cities: {
                    '1': {
                        ...emptyCityState,
                    },
                },
            },
        };

        const expected: ?CommonStateCity = null;

        const actual = currentlyViewedCitySelector(state);

        expect(actual).toEqual(expected);
    });

    it('returns currently viewed city', () => {
        const state: ClientState = {
            ...emptyClientState,
            menu: {
                ...emptyClientState.menu,
                cityView: {
                    ...emptyClientState.menu.cityView,
                    currentCityId: '1',
                },
            },
            commonState: {
                ...emptyCommonState,
                cities: {
                    '1': {
                        ...emptyCityState,
                    },
                },
            },
        };

        const expected: ?CommonStateCity = {
            ...emptyCityState,
        };

        const actual = currentlyViewedCitySelector(state);

        expect(actual).toEqual(expected);
    });
});

describe('citiesOwnedByPlayerSelector', () => {
    it('returns all cities owned by the player', () => {
        const state: ClientState = {
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
                    '2': {
                        ...emptyCityState,
                        ownerId: 'player2',
                    },
                    '3': {
                        ...emptyCityState,
                        ownerId: 'player1',
                    },
                },
            },
        };

        const expected: $ReadOnlyArray<string> = ['1', '3'];

        const actual = cityIdsOwnedByPlayerSelector(state);

        expect(actual).toEqual(expected);
    });
});

describe('cityDistancesSelector', () => {
    it('returns distances between cities', () => {
        const state: ClientState = {
            ...emptyClientState,
            commonState: {
                ...emptyCommonState,
                cities: {
                    '1': {
                        ...emptyCityState,
                        location: { x: -2, y: 0 },
                    },
                    '2': {
                        ...emptyCityState,
                        location: { x: 0, y: 0 },
                    },
                    '3': {
                        ...emptyCityState,
                        location: { x: 1, y: 0 },
                    },
                },
            },
        };

        const expected: { [string]: { [string]: number, ... }, ... } = {
            '1': {
                '1': 0,
                '2': 2,
                '3': 3,
            },
            '2': {
                '1': 2,
                '2': 0,
                '3': 1,
            },
            '3': {
                '1': 3,
                '2': 1,
                '3': 0,
            },
        };

        const actual = cityDistancesSelector(state);

        expect(actual).toEqual(expected);
    });
});

describe('isGameStartingSelector', () => {
    it('returns true when player is loaded and they do not have any cities', () => {
        const state: ClientState = {
            ...emptyClientState,
            player: {
                name: 'player1',
            },
            commonState: {
                ...emptyCommonState,
                cities: {
                    '1': {
                        ...emptyCityState,
                        ownerId: 'player2',
                    },
                    '2': {
                        ...emptyCityState,
                        ownerId: 'player3',
                    },
                },
            },
        };

        const expected: boolean = true;

        const actual = isGameStartingSelector(state);

        expect(actual).toEqual(expected);
    });

    it('returns false when player is not loaded', () => {
        const state: ClientState = {
            ...emptyClientState,
            player: {
                name: null,
            },
            commonState: {
                ...emptyCommonState,
                cities: {
                    '1': {
                        ...emptyCityState,
                        ownerId: 'player2',
                    },
                    '2': {
                        ...emptyCityState,
                        ownerId: 'player3',
                    },
                },
            },
        };

        const expected: boolean = false;

        const actual = isGameStartingSelector(state);

        expect(actual).toEqual(expected);
    });

    it('returns false when player owns cities', () => {
        const state: ClientState = {
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
                    '2': {
                        ...emptyCityState,
                        ownerId: 'player2',
                    },
                },
            },
        };

        const expected: boolean = false;

        const actual = isGameStartingSelector(state);

        expect(actual).toEqual(expected);
    });
});