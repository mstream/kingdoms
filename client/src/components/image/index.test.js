// @flow

import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import configureStore from 'redux-mock-store';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { emptyClientState } from '../../state/state';
import { ImageComponent } from './index';

const mockStore = configureStore([]);

describe('ImageComponent', () => {
    test('renders passed children components', async () => {
        const state = {
            ...emptyClientState,
        };

        const image = null;
        const ratio = '100%';

        const store = mockStore(state);

        const { queryByText } = render(
            <Provider store={store}>
                <ImageComponent
                    image={image}
                    ratio={ratio}>
                    <p>text1</p>
                    <p>text2</p>
                </ImageComponent>
            </Provider>,
        );

        expect(queryByText('text1')).toBeInTheDocument();
        expect(queryByText('text2')).toBeInTheDocument();
    });
});