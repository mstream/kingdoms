// @flow

import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { CityBuildingsComponent } from './index';
import {
    emptyCityState,
    emptyCommonState,
} from '../../../../common/src/state';
import { TAB_BUILDINGS, TAB_UNITS } from '../../state/modules/menu/types';
import { emptyClientState } from '../../state/modules/types';
import type { ClientState } from '../../state/modules/root';

const mockStore = configureStore([]);


describe('CityResourcesComponent', () => {
    test('does not display when tab is not the buildings', async () => {
        const state: ClientState = {
            ...emptyClientState,
            menu: {
                ...emptyClientState.menu,
                cityView: {
                    ...emptyClientState.menu.cityView,
                    currentCityId: '1',
                    tab: TAB_UNITS,
                },
            },
            commonState: {
                ...emptyCommonState,
                cities: {
                    '1': {
                        ...emptyCityState,
                    },
                },
            },
        };

        const store = mockStore(state);

        const { queryByRole } = render(
            <Provider store={store}>
                <CityBuildingsComponent/>
            </Provider>,
        );

        await expect(queryByRole('tabpanel')).not.toBeInTheDocument();
    });

    test('does display when tab is the buildings', async () => {
        const state: ClientState = {
            ...emptyClientState,
            menu: {
                ...emptyClientState.menu,
                cityView: {
                    ...emptyClientState.menu.cityView,
                    currentCityId: '1',
                    tab: TAB_BUILDINGS,
                },
            },
            commonState: {
                ...emptyCommonState,
                cities: {
                    '1': {
                        ...emptyCityState,
                    },
                },
            },
        };

        const store = mockStore(state);

        const { queryByRole } = render(
            <Provider store={store}>
                <CityBuildingsComponent/>
            </Provider>,
        );

        await expect(queryByRole('tabpanel')).toBeInTheDocument();
    });
});