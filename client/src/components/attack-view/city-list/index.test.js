// @flow

import '@testing-library/jest-dom/extend-expect';
import {
    AttackViewCityListComponent,
} from './index';
import {
    Provider,
} from 'react-redux';
import {
    emptyCityState,
} from '../../../../../common/src/state/modules/cities/reducer/state';
import {
    emptyClientState,
} from '../../../state/state';
import {
    emptyCommonState,
} from '../../../../../common/src/state/modules/state';
import {
    render,
} from '@testing-library/react';
import React from 'react';
import configureStore from 'redux-mock-store';
import type {
    ClientState,
} from '../../../state/types';

const mockStore = configureStore(
    [],
);

describe(
    `AttackViewCityListComponent`,
    () => {

        test(
            `displays a city list with distances`,
            async () => {

                const state: ClientState = {
                    ...emptyClientState,
                    commonState: {
                        ...emptyCommonState,
                        cities: {
                            city1: {
                                ...emptyCityState,
                                location: {
                                    x: 0,
                                    y: 0,
                                },
                                name    : `Cityone`,
                                ownerId: `player2`,
                            },
                            city2: {
                                ...emptyCityState,
                                location: {
                                    x: 0,
                                    y: -4,
                                },
                                name    : `Citytwo`,
                                ownerId: `player3`,
                            },
                            city3: {
                                ...emptyCityState,
                                location: {
                                    x: 2,
                                    y: 0,
                                },
                                name    : `Citythree`,
                                ownerId: `player1`,
                            },
                            city4: {
                                ...emptyCityState,
                                location: {
                                    x: 0,
                                    y: 3,
                                },
                                name    : `Cityfour`,
                                ownerId: `player1`,
                            },
                        },
                    },
                    menu: {
                        ...emptyClientState.menu,
                        attackView: {
                            ...emptyClientState.menu.attackView,
                            attackedCityId: `city1`,
                        },
                    },
                    player: {
                        name: `player1`,
                    },
                };

                const store = mockStore(
                    state,
                );

                const {
                    queryByText,
                } = render(
                    <Provider store={store}>
                        <AttackViewCityListComponent/>
                    </Provider>,
                );

                await expect(
                    queryByText(
                        `Citythree`,
                    ),
                )
                    .toBeInTheDocument();

                await expect(
                    queryByText(
                        `Cityfour`,
                    ),
                )
                    .toBeInTheDocument();

                await expect(
                    queryByText(
                        `Cityone`,
                    ),
                ).not.toBeInTheDocument();

                await expect(
                    queryByText(
                        `Citytwo`,
                    ),
                ).not.toBeInTheDocument();

                await expect(
                    queryByText(
                        `2 squares away`,
                    ),
                )
                    .toBeInTheDocument();

                await expect(
                    queryByText(
                        `3 squares away`,
                    ),
                )
                    .toBeInTheDocument();

                await expect(
                    queryByText(
                        `4 squares away`,
                    ),
                ).not.toBeInTheDocument();

            },
        );

    },
);
