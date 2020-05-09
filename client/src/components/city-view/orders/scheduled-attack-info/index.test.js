// @flow

import '@testing-library/jest-dom/extend-expect';
import {
    CityOrdersScheduledAttackInfoComponent,
} from './index';
import {
    Provider,
} from 'react-redux';
import {
    UNIT_PIKEMAN,
} from '../../../../../../common/src/state/modules/_children/rules/reducer/types';
import {
    emptyClientState,
} from '../../../../pages/world/state/state';
import {
    emptyRegimentTemplateState,
} from '../../../../../../common/src/state/modules/_children/orders/reducer/state';
import {
    render,
} from '@testing-library/react';
import React from 'react';
import configureStore from 'redux-mock-store';
import type {
    ClientState,
} from '../../../../pages/world/state/types';
import type {
    CommonStateRegimentTemplate,
} from '../../../../../../common/src/state/modules/_children/orders/reducer/types';

const mockStore = configureStore(
    [],
);

describe(
    `CityOrdersScheduledAttackItemComponent`,
    () => {

        test(
            `displays the regiment template`,
            async () => {

                const state: ClientState = {
                    ...emptyClientState,
                };

                const regimentTemplate: CommonStateRegimentTemplate = {
                    ...emptyRegimentTemplateState,
                    [ UNIT_PIKEMAN ]: {
                        from: 100,
                        to  : 200,
                    },
                };

                const store = mockStore(
                    state,
                );

                const {
                    queryByText,
                } = render(
                    <Provider store={store}>
                        <CityOrdersScheduledAttackInfoComponent
                            regimentTemplate={regimentTemplate}
                        />
                    </Provider>,
                );

                expect(
                    queryByText(
                        `Pikemen`,
                    ),
                )
                    .toBeInTheDocument();

                expect(
                    queryByText(
                        /100/,
                    ),
                )
                    .toBeInTheDocument();

                expect(
                    queryByText(
                        /200/,
                    ),
                )
                    .toBeInTheDocument();

            },
        );

    },
);
