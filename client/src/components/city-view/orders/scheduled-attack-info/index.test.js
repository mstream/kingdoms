// @flow

import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import configureStore from 'redux-mock-store';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { emptyClientState } from '../../../../state/state';
import type { ClientState } from '../../../../state/types';
import { emptyRegimentTemplateState } from '../../../../../../common/src/state/modules/orders/reducer/state';
import { UNIT_PIKEMAN } from '../../../../../../common/src/state/modules/rules/reducer/types';
import { CityOrdersScheduledAttackInfoComponent } from './index';
import type { CommonStateRegimentTemplate } from '../../../../../../common/src/state/modules/orders/reducer/types';


const mockStore = configureStore([]);

describe('CityOrdersScheduledAttackItemComponent', () => {
    test('displays the regiment template', async () => {
        const state: ClientState = {
            ...emptyClientState,
        };

        const regimentTemplate: CommonStateRegimentTemplate = {
            ...emptyRegimentTemplateState,
            [UNIT_PIKEMAN]: {
                from: 100,
                to: 200,
            },
        };

        const store = mockStore(state);

        const { queryByText } = render(
            <Provider store={store}>
                <CityOrdersScheduledAttackInfoComponent
                    regimentTemplate={regimentTemplate}
                />
            </Provider>,
        );

        expect(queryByText('Pikemen')).toBeInTheDocument();
        expect(queryByText(/100/)).toBeInTheDocument();
        expect(queryByText(/200/)).toBeInTheDocument();
    });
});