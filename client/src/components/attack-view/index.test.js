// @flow

import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import type { ClientState } from '../../state/state';
import { emptyClientState } from '../../state/state';
import { AttackViewComponent } from '.';
import {
    emptyCityState,
    emptyCommonState,
} from '../../../../common/src/state';

const mockStore = configureStore([]);

describe('AttackViewComponent', () => {
    test('displays the attack form', async () => {
        const state: ClientState = {
            ...emptyClientState,
            menu: {
                ...emptyClientState.menu,
                attackView: {
                    ...emptyClientState.menu.attackView,
                    attackedCityId: '1',
                },
            },
            commonState: {
                ...emptyCommonState,
                cities: {
                    '1': {
                        ...emptyCityState,
                        name: 'Cityone',
                    },
                },
            },
        };

        const store = mockStore(state);

        const { queryByText } = render(
            <Provider store={store}>
                <AttackViewComponent/>
            </Provider>,
        );

        await expect(queryByText('Cityone')).toBeInTheDocument();
    });
});