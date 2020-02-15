/**
 * @flow
 */

import React from 'react';
import {render} from '@testing-library/react';
import {WorldMapComponent} from '.';

test('renders', () => {
    render(<WorldMapComponent windowSize={{x: 100, y: 100}}/>);
});
