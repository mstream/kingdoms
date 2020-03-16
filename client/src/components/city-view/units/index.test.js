// @flow

import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { CityUnitsComponent } from './index';
import {
    emptyCityState,
    emptyCommonState,
    UNIT_PEASANT,
    UNIT_PIKEMAN,
} from '../../../../../common/src/state';
import {
    TAB_RESOURCES,
    TAB_UNITS,
} from '../../../state/modules/menu/reducer/types';
import { emptyClientState } from '../../../state/modules/types';
import type { ClientState } from '../../../state/modules/root';
import { selectCityViewUnitsTab } from '../../../state/modules/menu/actions';

const mockStore = configureStore([]);

describe('CityUnitsComponent', () => {
    test('does not display when tab is not the units', async () => {
        const state: ClientState = {
            ...emptyClientState,
            menu: {
                ...emptyClientState.menu,
                cityView: {
                    ...emptyClientState.menu.cityView,
                    currentCityId: '1',
                    tab: TAB_RESOURCES,
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
                <CityUnitsComponent/>
            </Provider>,
        );

        await expect(queryByRole('tabpanel')).not.toBeInTheDocument();
    });

    test('switches to peasants view after clicking the peasants tab', async () => {
        const state: ClientState = {
            ...emptyClientState,
            menu: {
                ...emptyClientState.menu,
                cityView: {
                    ...emptyClientState.menu.cityView,
                    currentCityId: '1',
                    tab: TAB_UNITS,
                    unit: UNIT_PIKEMAN,
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

        const { queryByText } = render(
            <Provider store={store}>
                <CityUnitsComponent/>
            </Provider>,
        );

        const peasantsTab = queryByText('Peasants');

        if (peasantsTab == null) {
            throw Error('peasants tab not found');
        }

        fireEvent.click(peasantsTab);

        const actions = store.getActions();

        expect(actions[0]).toEqual(selectCityViewUnitsTab({ unitType: UNIT_PEASANT }));
    });
});