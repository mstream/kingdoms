// @flow


import type { ClientStateSelectorTestScenario } from '../../../types';
import { emptyClientState } from '../../../state';
import type { Geometry } from '../../../../../../../common/src/geometry';

type Scenarios = $ReadOnlyArray<ClientStateSelectorTestScenario<Geometry>>;

export const geometrySelectorTestScenarios: Scenarios = [
    {
        name: 'returns camera geometry',
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
    },
];