// @flow

import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import {render} from '@testing-library/react';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {emptyClientState} from '../../state/state';
import {CostInfoComponent} from '.';
import type {CommonStateResources} from '../../../../common/src/state';
import {emptyResourcesState} from '../../../../common/src/state';

const mockStore = configureStore([]);

describe('CostInfoComponent', () => {
    test('bla bla bla', () => {
        const availableResources: CommonStateResources = {
            ...emptyResourcesState,
            food: 100,
            wood: 20000,
        };

        const requiredResources: CommonStateResources = {
            ...emptyResourcesState,
            food: 200,
            wood: 10000,
        };

        const state = {
            ...emptyClientState,
        };

        const store = mockStore(state);

        const {getByText} = render(
            <Provider store={store}>
                <CostInfoComponent
                    availableResources={availableResources}
                    requiredResources={requiredResources}
                />
            </Provider>
        );
        expect(getByText(/food/)).toBeInTheDocument();
        expect(getByText(/200/)).toBeInTheDocument();
        expect(getByText(/wood/)).toBeInTheDocument();
        expect(getByText(/10k/)).toBeInTheDocument();
    });
});