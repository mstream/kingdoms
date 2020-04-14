// @flow

import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import {
    render,
} from '@testing-library/react';
import {
    Provider,
} from 'react-redux';
import configureStore from 'redux-mock-store';
import {
    ErrorsComponent, errorsComponentTestId,
} from '.';
import {
    emptyClientState,
} from '../../state/state';
import type {
    ClientState,
} from '../../state/types';

const mockStore = configureStore(
    [],
);

describe(
    `ErrorsComponent`,
    () => {

        test(
            `is hidden when there are no errors`,
            async () => {

                const state: ClientState = {
                    ...emptyClientState,
                    errors: [],
                };

                const store = mockStore(
                    state,
                );

                const {
                    queryByTestId,
                } = render(
                    <Provider store={store}>
                        <ErrorsComponent/>
                    </Provider>,
                );

                await expect(
                    queryByTestId(
                        errorsComponentTestId,
                    ),
                ).not.toBeInTheDocument();

            },
        );

        test(
            `displays errors`,
            async () => {

                const state: ClientState = {
                    ...emptyClientState,
                    errors: [
                        `error message 1`,
                        `error message 2`,
                    ],
                };

                const store = mockStore(
                    state,
                );

                const {
                    queryByText,
                } = render(
                    <Provider store={store}>
                        <ErrorsComponent/>
                    </Provider>,
                );

                await expect(
                    queryByText(
                        `error message 1`,
                    ),
                )
                    .toBeInTheDocument();

                await expect(
                    queryByText(
                        `error message 2`,
                    ),
                )
                    .toBeInTheDocument();

            },
        );

    },
);
