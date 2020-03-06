// @flow

import type {ClientState} from '../state';
import {emptyClientState} from '../state';
import type {
    CommonStateCities,
    CommonStateCity
} from '../../../../common/src/state';
import {
    citiesSelector,
    cityIdsOwnedByPlayerSelector,
    currentlyViewedCitySelector,
    isGameStartingSelector
} from './clientState';
import {emptyCityState, emptyServerState} from '../../../../common/src/state';

describe('citiesSelector', () => {
    it('returns all the cities', () => {
        const state: ClientState = {
            ...emptyClientState,
            serverState: {
                ...emptyServerState,
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
            serverState: {
                ...emptyServerState,
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
            serverState: {
                ...emptyServerState,
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
            serverState: {
                ...emptyServerState,
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
            serverState: {
                ...emptyServerState,
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
            serverState: {
                ...emptyServerState,
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
            serverState: {
                ...emptyServerState,
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