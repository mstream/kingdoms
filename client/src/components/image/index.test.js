// @flow

import '@testing-library/jest-dom/extend-expect';
import {
    ImageComponent,
} from './index';
import {
    Provider,
} from 'react-redux';
import {
    emptyClientState,
} from '../../pages/world/state/state';
import {
    render,
} from '@testing-library/react';
import React from 'react';
import configureStore from 'redux-mock-store';

const mockStore = configureStore(
    [],
);

describe(
    `ImageComponent`,
    () => {

        test(
            `renders passed children components`,
            async () => {

                const state = {
                    ...emptyClientState,
                };

                const image = null;
                const ratio = `100%`;

                const store = mockStore(
                    state,
                );

                const {
                    queryByText,
                } = render(
                    <Provider store={store}>
                        <ImageComponent image={image} ratio={ratio}>
                            <p>text1</p>
                            <p>text2</p>
                        </ImageComponent>
                    </Provider>,
                );

                expect(
                    queryByText(
                        `text1`,
                    ),
                )
                    .toBeInTheDocument();

                expect(
                    queryByText(
                        `text2`,
                    ),
                )
                    .toBeInTheDocument();

            },
        );

    },
);
