/**
 * @flow
 */

import React from 'react';
import {render} from '@testing-library/react';
import {ResourcesComponent} from '.';

test('renders', () => {
    const resources = [
        {
            type: 'FOOD',
            quantity: 10
        },
        {
            type: 'WOOD',
            quantity: 20
        },
    ];
    render(<ResourcesComponent resources={resources}/>);
});
