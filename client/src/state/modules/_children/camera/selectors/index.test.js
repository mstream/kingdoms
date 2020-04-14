// @flow

import {
    runClientStateSelectorsTestScenarios,
} from '../../../../utils';
import {
    clientStateCameraSelectors,
} from './index';
import {
    geometrySelectorTestScenarios,
} from './_test/geometry-test-scenarios';

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

                // $FlowFixMe
                moduleSelectors: clientStateCameraSelectors,
                scenarios      : {
                    // $FlowFixMe
                    geometry: geometrySelectorTestScenarios,
                },
            },
        );

    },
);
