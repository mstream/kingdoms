// @flow

import {createCity} from '../../../../../common/src/actions';
import type {CommonState} from '../../../../../common/src/state';
import {createCityCitiesReducer} from './create-city';
import {initialCityState} from '../../state';
import {
    emptyCityState,
    emptyCommonState
} from '../../../../../common/src/state';

describe(`createCityCitiesReducer`, () => {
    it(`fails when there is not enough space for the city`, () => {
        const action = createCity({
            cityId: `1`,
            cityName: `Name`,
            playerId: `player1`
        });
        const previousState: CommonState = {
            ...emptyCommonState,
            rules: {
                ...emptyCommonState.rules,
                minimalCityMargin: {
                    x: 2,
                    y: 2,
                },
            },
            world: {
                size: {
                    x: 1,
                    y: 1,
                }
            }
        };
        const expected = {
            errors: [`there is no space for another city`],
            state: null,
        };
        const actual = createCityCitiesReducer({action, state: previousState});
        expect(actual).toEqual(expected);
    });

    it(`fails when the city name is too short`, () => {
        const action = createCity({
            cityId: `1`,
            cityName: `Na`,
            playerId: `player1`
        });
        const previousState: CommonState = {
            ...emptyCommonState,
            rules: {
                ...emptyCommonState.rules,
                minimalCityMargin: {
                    x: 2,
                    y: 2,
                }
            },
            world: {
                size: {
                    x: 2,
                    y: 2,
                }
            }
        };
        const expected = {
            errors: [`the city name is too short`],
            state: null,
        };
        const actual = createCityCitiesReducer({action, state: previousState});
        expect(actual).toEqual(expected);
    });

    it(`fails when the city name is too long`, () => {
        const action = createCity({
            cityId: `1`,
            cityName: `Namenamenamenamenamename`,
            playerId: `player1`
        });
        const previousState: CommonState = {
            ...emptyCommonState,
            rules: {
                ...emptyCommonState.rules,
                minimalCityMargin: {
                    x: 2,
                    y: 2,
                }
            },
            world: {
                size: {
                    x: 2,
                    y: 2,
                }
            }
        };
        const expected = {
            errors: [`the city name is too long`],
            state: null,
        };
        const actual = createCityCitiesReducer({action, state: previousState});
        expect(actual).toEqual(expected);
    });

    it(`fails when the city does not follow the convention`, () => {
        const action = createCity({
            cityId: `1`,
            cityName: `name`,
            playerId: `player1`
        });
        const previousState: CommonState = {
            ...emptyCommonState,
            rules: {
                ...emptyCommonState.rules,
                minimalCityMargin: {
                    x: 2,
                    y: 2,
                }
            },
            world: {
                size: {
                    x: 2,
                    y: 2,
                }
            }
        };
        const expected = {
            errors: [`the city name does not follow the convention`],
            state: null,
        };
        const actual = createCityCitiesReducer({action, state: previousState});
        expect(actual).toEqual(expected);
    });

    it(`fails when the player already owns any city`, () => {
        const action = createCity({
            cityId: `1`,
            cityName: `Name`,
            playerId: `player1`
        });
        const previousState: CommonState = {
            ...emptyCommonState,
            cities: {
                ...emptyCommonState.cities,
                '1': {
                    ...emptyCityState,
                    location: {
                        x: 0,
                        y: 0,
                    },
                    ownerId: `player1`,
                },
            },
            rules: {
                ...emptyCommonState.rules,
                minimalCityMargin: {
                    x: 2,
                    y: 2,
                }
            },
            world: {
                size: {
                    x: 5,
                    y: 5,
                }
            }
        };
        const expected = {
            errors: [`player already owns a city`],
            state: null,
        };
        const actual = createCityCitiesReducer({action, state: previousState});
        expect(actual).toEqual(expected);
    });

    it(`creates a new city`, () => {
        const action = createCity({
            cityId: `1`,
            cityName: `Name`,
            playerId: `player1`
        });
        const previousState: CommonState = {
            ...emptyCommonState,
            rules: {
                ...emptyCommonState.rules,
                minimalCityMargin: {
                    x: 2,
                    y: 2,
                }
            },
            world: {
                size: {
                    x: 2,
                    y: 2,
                }
            }
        };
        const expected = {
            errors: [],
            state: {
                ...previousState.cities,
                '1': {
                    ...initialCityState,
                    location: {
                        x: 0,
                        y: 0,
                    },
                    name: `Name`,
                    ownerId: `player1`,
                }
            },
        };
        const actual = createCityCitiesReducer({action, state: previousState});
        expect(actual).toEqual(expected);
    });
});