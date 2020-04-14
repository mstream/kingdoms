// @flow

import {
    emptyClientState,
} from '../../../../../state';
import type {
    Geometry,
} from '../../../../../../../../common/src/geometry';
import type {
    ClientStateSelectorTestScenario,
} from '../../../../../types';

type Scenarios = $ReadOnlyArray< ClientStateSelectorTestScenario< Geometry > >;

export const geometrySelectorTestScenarios: Scenarios = [
    {
        expectedValue: {
            location: {
                x: 1,
                y: 2,
            },
            size: {
                x: 3,
                y: 4,
            },
        },
        name : `returns camera geometry`,
        state: {
            ...emptyClientState,
            camera: {
                ...emptyClientState.camera,
                geometry: {
                    location: {
                        x: 1,
                        y: 2,
                    },
                    size: {
                        x: 3,
                        y: 4,
                    },
                },
            },
        },
    },
];
