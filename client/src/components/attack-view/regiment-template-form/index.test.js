// @flow

import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { AttackViewRegimentTemplateFormComponent } from '.';
import type { ClientState } from '../../../state/modules/types';
import { emptyClientState } from '../../../state/modules/types';
import { emptyCommonState } from '../../../../../common/src/state/modules/state';
import { emptyCityState } from '../../../../../common/src/state/modules/cities/reducer/state';
import { emptyRegimentTemplateState } from '../../../../../common/src/state/modules/orders/reducer/state';

const mockStore = configureStore([]);

describe('AttackViewRegimentTemplateFormComponent', () => {
    test('displays the attack form', async () => {
        const state: ClientState = {
            ...emptyClientState,
            commonState: {
                ...emptyCommonState,
                cities: {
                    'city1': {
                        ...emptyCityState,
                    },
                },
            },
            menu: {
                ...emptyClientState.menu,
                attackView: {
                    ...emptyClientState.menu.attackView,
                    attackingCityId: 'city1',
                    regimentTemplate: {
                        ...emptyRegimentTemplateState,
                    },
                },
            },
        };


        const updateAttackViewRegimentTemplate = jest.fn();

        const store = mockStore(state);

        const { queryByText } = render(
            <Provider store={store}>
                <AttackViewRegimentTemplateFormComponent
                    updateAttackViewRegimentTemplate={updateAttackViewRegimentTemplate}
                />
            </Provider>,
        );

        await expect(queryByText('Peasants')).not.toBeInTheDocument();
        await expect(queryByText('Pikemen')).toBeInTheDocument();
        await expect(queryByText('Archers')).toBeInTheDocument();
        await expect(queryByText('Swordsmen')).toBeInTheDocument();
        await expect(queryByText('Knights')).toBeInTheDocument();
        await expect(queryByText('Catapults')).toBeInTheDocument();
        await expect(queryByText('Nobles')).toBeInTheDocument();
    });
});