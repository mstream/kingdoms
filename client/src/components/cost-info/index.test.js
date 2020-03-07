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
import type { ClientState } from '../../state/state';

const mockStore = configureStore([]);

describe('CostInfoComponent', () => {
    test('bla bla bla', async () => {
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

        const state: ClientState = {
            ...emptyClientState,
        };

        const store = mockStore(state);

        const {queryByText} = render(
            <Provider store={store}>
                <CostInfoComponent
                    availableResources={availableResources}
                    requiredResources={requiredResources}
                />
            </Provider>
        );
        await expect(queryByText(/food/)).toBeInTheDocument();
        await expect(queryByText(/200/)).toBeInTheDocument();
        await expect(queryByText(/wood/)).toBeInTheDocument();
        await expect(queryByText(/10k/)).toBeInTheDocument();
    });
});