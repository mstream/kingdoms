/**
 * @flow
 */

import React from 'react';
import {render} from '@testing-library/react';
import {TileComponent} from '.';

test('renders', () => {
    const geometry = {
        location: {
            x: 64,
            y: 64,
        },
        size: {
            x: 32,
            y: 32
        }
    };
    const tile = {
        index: {
            x: 1,
            y: 2
        },
        location: {
            x: 64,
            y: 64,
        },
        type: 'PLAINS',
    };
    render(<TileComponent geometry={geometry} tile={tile}/>);
});
