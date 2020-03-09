// @flow

import type { ClientState, ClientStateCityViewTab } from '../state';
import { emptyClientState, TAB_OVERVIEW, TAB_UNITS } from '../state';
import type {
    CommonStateCities,
    CommonStateCity
} from '../../../../common/src/state';
import {emptyCityState, emptyCommonstate} from '../../../../common/src/state';
import {
    activeCityTabSelector,
    citiesSelector,
    cityIdsOwnedByPlayerSelector,
    currentlyViewedCitySelector,
    isGameStartingSelector,
} from './client-state';

describe('citiesSelector', () => {
    it('returns all the cities', () => {
        const state: ClientState = {
            ...emptyClientState,
            commonState: {
                ...emptyCommonstate,
                cities: {
                    '1': {
                        ...emptyCityState,
                    },
                    '2': {
                        ...emptyCityState,
                    }
                },
            }
        };

        const expected: ?CommonStateCities = {
            '1': {
                ...emptyCityState,
            },
            '2': {
                ...emptyCityState,
            }
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
                }
            }
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
                ...emptyCommonstate,
                cities: {
                    '1': {
                        ...emptyCityState,
                    },
                },
            }
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
                ...emptyCommonstate,
                cities: {
                    '1': {
                        ...emptyCityState,
                    },
                },
            }
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
                name: 'player1'
            },
            commonState: {
                ...emptyCommonstate,
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
                    }
                },
            }
        };

        const expected: $ReadOnlyArray<string> = ['1', '3'];

        const actual = cityIdsOwnedByPlayerSelector(state);

        expect(actual).toEqual(expected);
    });
});

describe('isGameStartingSelector', () => {
    it('returns true when player is loaded and they do not have any cities', () => {
        const state: ClientState = {
            ...emptyClientState,
            player: {
                name: 'player1'
            },
            commonState: {
                ...emptyCommonstate,
                cities: {
                    '1': {
                        ...emptyCityState,
                        ownerId: 'player2',
                    },
                    '2': {
                        ...emptyCityState,
                        ownerId: 'player3',
                    }
                },
            }
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
                ...emptyCommonstate,
                cities: {
                    '1': {
                        ...emptyCityState,
                        ownerId: 'player2',
                    },
                    '2': {
                        ...emptyCityState,
                        ownerId: 'player3',
                    }
                },
            }
        };

        const expected: boolean = false;

        const actual = isGameStartingSelector(state);

        expect(actual).toEqual(expected);
    });

    it('returns false when player owns cities', () => {
        const state: ClientState = {
            ...emptyClientState,
            player: {
                name: 'player1'
            },
            commonState: {
                ...emptyCommonstate,
                cities: {
                    '1': {
                        ...emptyCityState,
                        ownerId: 'player1',
                    },
                    '2': {
                        ...emptyCityState,
                        ownerId: 'player2',
                    }
                },
            }
        };

        const expected: boolean = false;

        const actual = isGameStartingSelector(state);

        expect(actual).toEqual(expected);
    });
});