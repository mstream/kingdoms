/**
 * @flow
 */

import React from 'react';
import {render} from '@testing-library/react';
import {CityComponent} from '.';

test('renders', () => {
    const city = {
        id: 'id',
        name: 'name',
        geometry: {
            location: {
                x: 64,
                y: 64,
            },
            size: {
                x: 32,
                y: 32
            }
        },
        resources: []
    };
    render(<CityComponent city={city}/>);
});
