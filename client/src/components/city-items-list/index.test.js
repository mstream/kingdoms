// @flow

import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import {render} from '@testing-library/react';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {emptyClientState} from '../../state/state';
import {CityItemsListComponent} from '.';

const mockStore = configureStore([]);

describe('CityItemsListComponent', () => {
    test('renders city name and its development level', () => {
        const state = {
            ...emptyClientState,
        };

        const store = mockStore(state);

        const {getByText} = render(
            <Provider store={store}>
                <CityItemsListComponent>
                    <p>item1</p>
                    <p>item2</p>
                    <p>item3</p>
                </CityItemsListComponent>
            </Provider>
        );
        expect(getByText('item1')).toBeInTheDocument();
        expect(getByText('item2')).toBeInTheDocument();
        expect(getByText('item3')).toBeInTheDocument();
    });
});