// @flow

import '@testing-library/jest-dom/extend-expect';
import {
    MenuComponent,
} from './index';
import {
    Provider,
} from 'react-redux';
import {
    emptyClientState,
} from '../../pages/world/state/state';
import {
    render,
} from '@testing-library/react';
import React from 'react';
import configureStore from 'redux-mock-store';
import type {
    ClientState,
} from '../../pages/world/state/types';

const mockStore = configureStore(
    [],
);

describe(
    `MenuComponent`,
    () => {

        test(
            `renders player name when they are signed in`,
            async () => {

                const state: ClientState = {
                    ...emptyClientState,
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
                        <MenuComponent/>
                    </Provider>,
                );

                await expect(
                    queryByText(
                        `player1`,
                    ),
                )
                    .toBeInTheDocument();

            },
        );

    },
);
