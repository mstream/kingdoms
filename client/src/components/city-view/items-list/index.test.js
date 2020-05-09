// @flow

import '@testing-library/jest-dom/extend-expect';
import {
    CityItemsListComponent,
} from './index';
import {
    Provider,
} from 'react-redux';
import {
    emptyClientState,
} from '../../../pages/world/state/state';
import {
    render,
} from '@testing-library/react';
import React from 'react';
import configureStore from 'redux-mock-store';
import type {
    ClientState,
} from '../../../pages/world/state/types';

const mockStore = configureStore(
    [],
);

describe(
    `CityItemsListComponent`,
    () => {

        test(
            `renders city name and its development level`,
            async () => {

                const state: ClientState = {
                    ...emptyClientState,
                };

                const store = mockStore(
                    state,
                );

                const {
                    queryByText,
                } = render(
                    <Provider store={store}>
                        <CityItemsListComponent>
                            <p>item1</p>
                            <p>item2</p>
                            <p>item3</p>
                        </CityItemsListComponent>
                    </Provider>,
                );

                await expect(
                    queryByText(
                        `item1`,
                    ),
                )
                    .toBeInTheDocument();

                await expect(
                    queryByText(
                        `item2`,
                    ),
                )
                    .toBeInTheDocument();

                await expect(
                    queryByText(
                        `item3`,
                    ),
                )
                    .toBeInTheDocument();

            },
        );

    },
);
