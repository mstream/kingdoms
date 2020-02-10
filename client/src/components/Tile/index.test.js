/**
 * @flow
 */

import React from 'react';
import {render} from '@testing-library/react';
import {TileComponent} from '.';

test('renders', () => {
    const tile = {
        index: {
            x: 1,
            y: 2
        },
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
        type: 'PLAINS',
    };
    render(<TileComponent debugColor="rgba(0,0,0,0)" tile={tile}/>);
});
