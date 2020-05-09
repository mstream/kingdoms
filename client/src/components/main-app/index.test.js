// @flow

import '@testing-library/jest-dom/extend-expect';
import {
    MainAppComponent,
} from './index';
import {
    Provider,
} from "react-redux";
import {
    emptyClientState,
} from '../../pages/main/state/state';
import {
    render,
} from "@testing-library/react";
import {
    testIds,
} from '../../../../common/src/ui';
import React from 'react';
import configureStore from 'redux-mock-store';
import type {
    ClientState,
} from '../../pages/main/state/types';

const mockStore = configureStore(
    [],
);

describe(
    `MainAppComponent`,
    () => {

        test(
            `renders`,
            async () => {

                const state: ClientState = {
                    ...emptyClientState,
                };

                const store = mockStore(
                    state,
                );

                const {
                    queryByTestId,
                } = render(
                    <Provider store={store}>
                        <MainAppComponent/>
                    </Provider>,
                );

                await expect(
                    queryByTestId(
                        testIds.mainApp.parent,
                    ),
                )
                    .toBeInTheDocument();

            },
        );

    },
);
