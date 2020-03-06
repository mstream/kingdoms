// @flow

import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import {render} from '@testing-library/react';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {emptyClientState} from '../../state/state';
import {ChangeInfoComponent} from './index';
import type {Quantities} from '../../../../common/src/quantity';

const mockStore = configureStore([]);

describe('ChangeInfoComponent', () => {
    test('renders city name and its development level', () => {
        const changeInfo: Quantities = {
            'a a a': 10,
            'b b b': -20,
            'c c c': 10000,
        };

        const state = {
            ...emptyClientState,
        };

        const store = mockStore(state);

        const {getByText} = render(
            <Provider store={store}>
                <ChangeInfoComponent changeInfo={changeInfo}/>
            </Provider>
        );
        expect(getByText(/a a a/)).toBeInTheDocument();
        expect(getByText(/10\/h/)).toBeInTheDocument();
        expect(getByText(/b b b/)).toBeInTheDocument();
        expect(getByText(/20\/h/)).toBeInTheDocument();
        expect(getByText(/c c c/)).toBeInTheDocument();
        expect(getByText(/10k\/h/)).toBeInTheDocument();
    });
});