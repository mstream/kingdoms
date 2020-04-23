// @flow

import {
    clientStateCameraSelectors,
} from './index';
import {
    geometrySelectorTestScenarios,
} from './_test/geometry-test-scenarios';
import {
    runClientStateSelectorsTestScenarios,
} from '../../../../test-utils';

describe(
    `cameraSelectors`,
    () => {

        runClientStateSelectorsTestScenarios(
            {
                jest: {
                    describe,
                    expect,
                    it,
                },

                moduleSelectors: clientStateCameraSelectors,
                scenarios      : {
                    // $FlowFixMe
                    geometry: geometrySelectorTestScenarios,
                },
            },
        );

    },
);
