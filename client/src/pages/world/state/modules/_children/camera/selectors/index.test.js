// @flow

import {
    clientStateCameraSelectors,
} from './index';
import {
    generateSelectorTests,
} from '../../../../test-utils';
import {
    geometrySelectorTestScenarios,
} from './_test/geometry-test-scenarios';

const scenarios = {
    geometry: geometrySelectorTestScenarios,
};

describe(
    `cameraSelectors`,
    () => {

        generateSelectorTests(
            {
                jest: {
                    describe,
                    expect,
                    it,
                },

                moduleSelectors: clientStateCameraSelectors,
                scenarios,
            },
        );

    },
);
