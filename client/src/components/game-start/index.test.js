// @flow

import '@testing-library/jest-dom/extend-expect';
import {
    GameStartComponent,
} from './index';
import {
    Provider,
} from 'react-redux';
import {
    emptyCityState,
} from '../../../../common/src/state/modules/_children/cities/reducer/state';
import {
    emptyClientState,
} from '../../pages/world/state/state';
import {
    emptyCommonState,
} from '../../../../common/src/state/modules/state';
import {
    render,
} from '@testing-library/react';
import {
    testIds,
} from '../../../../common/src/ui';
import React from 'react';
import configureStore from 'redux-mock-store';
import type {
    ClientState,
} from '../../pages/world/state/types';

const mockStore = configureStore(
    [],
);

describe(
    `GameStartComponent`,
    () => {

        test(
            `does not show up when game is not starting`,
            async () => {

                const state: ClientState = {
                    ...emptyClientState,
                    commonState: {
                        ...emptyCommonState,
                        cities: {
                            city1: {
                                ...emptyCityState,
                                ownerId: `player1`,
                            },
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
                    queryByTestId,
                } = render(
                    <Provider store={store}>
                        <GameStartComponent/>
                    </Provider>,
                );

                await expect(
                    queryByTestId(
                        testIds.gameStart.parent,
                    ),
                ).not.toBeInTheDocument();

            },
        );

        test(
            `does show up when game is starting`,
            async () => {

                const state: ClientState = {
                    ...emptyClientState,
                    commonState: {
                        ...emptyCommonState,
                        cities: {
                            city1: {
                                ...emptyCityState,
                                ownerId: `player2`,
                            },
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
                        <GameStartComponent/>
                    </Provider>,
                );

                await expect(
                    queryByText(
                        `Start`,
                    ),
                )
                    .toBeInTheDocument();

                await expect(
                    queryByText(
                        `City name`,
                    ),
                )
                    .toBeInTheDocument();

            },
        );

    },
);
