// @flow

import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import type { ClientState } from '../../state/state';
import { emptyClientState } from '../../state/state';
import { CostInfoComponent } from '.';
import type { CommonStateResources } from '../../../../common/src/state/state';
import {
    emptyResourcesState,
    RESOURCE_FOOD,
    RESOURCE_WOOD,
} from '../../../../common/src/state/state';

const mockStore = configureStore([]);

describe('CostInfoComponent', () => {
    test('bla bla bla', async () => {
        const availableResources: CommonStateResources = {
            ...emptyResourcesState,
            [RESOURCE_FOOD]: 100,
            [RESOURCE_WOOD]: 20000,
        };

        const requiredResources: CommonStateResources = {
            ...emptyResourcesState,
            [RESOURCE_FOOD]: 200,
            [RESOURCE_WOOD]: 10000,
        };

        const state: ClientState = {
            ...emptyClientState,
        };

        const store = mockStore(state);

        const { queryByText } = render(
            <Provider store={store}>
                <CostInfoComponent
                    availableResources={availableResources}
                    requiredResources={requiredResources}
                />
            </Provider>,
        );

        await expect(queryByText(/RESOURCE_FOOD/)).toBeInTheDocument();
        await expect(queryByText(/200/)).toBeInTheDocument();
        await expect(queryByText(/RESOURCE_WOOD/)).toBeInTheDocument();
        await expect(queryByText(/10k/)).toBeInTheDocument();
    });
});