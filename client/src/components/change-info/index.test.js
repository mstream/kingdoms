// @flow

import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import {render} from '@testing-library/react';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {emptyClientState} from '../../state/state';
import {ChangeInfoComponent} from './index';
import type {Quantities} from '../../../../common/src/quantity';
import type { ClientState } from '../../state/state';

const mockStore = configureStore([]);

describe('ChangeInfoComponent', () => {
    test('renders city name and its development level', async () => {
        const changeInfo: Quantities = {
            'a a a': 10,
            'b b b': -20,
            'c c c': 10000,
        };

        const state: ClientState = {
            ...emptyClientState,
        };

        const store = mockStore(state);

        const {queryByText} = render(
            <Provider store={store}>
                <ChangeInfoComponent changeInfo={changeInfo}/>
            </Provider>
        );
        await expect(queryByText(/a a a/)).toBeInTheDocument();
        await expect(queryByText(/10\/h/)).toBeInTheDocument();
        await expect(queryByText(/b b b/)).toBeInTheDocument();
        await expect(queryByText(/20\/h/)).toBeInTheDocument();
        await expect(queryByText(/c c c/)).toBeInTheDocument();
        await expect(queryByText(/10k\/h/)).toBeInTheDocument();
    });
});