// @flow

import '@testing-library/jest-dom/extend-expect';
import {
    CityViewTabsComponent,
} from './index';
import {
    Provider,
} from 'react-redux';
import {
    TAB_OVERVIEW,
} from '../../../state/modules/_children/menu/reducer/types';
import {
    emptyClientState,
} from '../../../state/state';
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
    `CityViewTabsComponent`,
    () => {

        test(
            `bla bla bla`,
            async () => {

                const state: ClientState = {
                    ...emptyClientState,
                    menu: {
                        ...emptyClientState.menu,
                        cityView: {
                            ...emptyClientState.menu.cityView,
                            tab: TAB_OVERVIEW,
                        },
                    },
                };

                const store = mockStore(
                    state,
                );

                const {
                    queryByText,
                } = render(
                    <Provider store={store}>
                        <CityViewTabsComponent/>
                    </Provider>,
                );

                await expect(
                    queryByText(
                        /Overview/,
                    ),
                )
                    .toBeInTheDocument();

                await expect(
                    queryByText(
                        /Resources/,
                    ),
                )
                    .toBeInTheDocument();

                await expect(
                    queryByText(
                        /Units/,
                    ),
                )
                    .toBeInTheDocument();

                await expect(
                    queryByText(
                        /Buildings/,
                    ),
                )
                    .toBeInTheDocument();

            },
        );

    },
);
