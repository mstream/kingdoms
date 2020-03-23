// @flow

import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import {render} from '@testing-library/react';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {CityItemsListComponent} from './index';
import type { ClientState } from '../../../state/modules/types';
import { emptyClientState } from '../../../state/modules/state';

const mockStore = configureStore([]);

describe('CityItemsListComponent', () => {
    test('renders city name and its development level', async () => {
        const state: ClientState = {
            ...emptyClientState,
        };

        const store = mockStore(state);

        const {queryByText} = render(
            <Provider store={store}>
                <CityItemsListComponent>
                    <p>item1</p>
                    <p>item2</p>
                    <p>item3</p>
                </CityItemsListComponent>
            </Provider>
        );
        await expect(queryByText('item1')).toBeInTheDocument();
        await expect(queryByText('item2')).toBeInTheDocument();
        await expect(queryByText('item3')).toBeInTheDocument();
    });
});