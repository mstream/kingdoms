// @flow

import '@testing-library/jest-dom/extend-expect';
import {
    Provider,
} from 'react-redux';
import {
    WorldsListComponent,
} from '.';
import {
    emptyClientState,
} from '../../pages/main/state/state';
import {
    render,
} from '@testing-library/react';
import React from 'react';
import configureStore from 'redux-mock-store';
import type {
    ClientState,
} from '../../pages/main/state/types';

const mockStore = configureStore(
    [],
);

describe(
    `WorldsListComponent`,
    () => {

        test(
            `displays world links`,
            async () => {

                const state: ClientState = {
                    ...emptyClientState,
                    worlds: {
                        ...emptyClientState.worlds,
                        isLoading: false,
                        items    : [
                            `world1`,
                            `world2`,
                        ],
                    },
                };

                const store = mockStore(
                    state,
                );

                const {
                    queryByText,
                } = render(
                    <Provider store={store}>
                        <WorldsListComponent/>
                    </Provider>,
                );

                await expect(
                    queryByText(
                        `world1`,
                    ),
                )
                    .toBeInTheDocument();

                await expect(
                    queryByText(
                        `world2`,
                    ),
                )
                    .toBeInTheDocument();

            },
        );

    },
);
