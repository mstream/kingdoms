// @flow

import {
    appModel,
} from '../../../../../../../../../../../../../../models/app';


import {
    selectors,
} from '../../../../../../../../../../../../../../models/selectors';
import type {
    CreateCityScenarioContext,
} from '../../../../types';
import type {
    ScenarioExecution,
} from '../../../../../../../../../../../../../types';

type Execution = ScenarioExecution< CreateCityScenarioContext,
    CreateCityScenarioContext >;

export const execution: Execution
    = async (
        {
            context,
            t,
        },
    ) => {

        await appModel.actions.closeCityView(
            {
                name: `non-existent`,
                t,
            },
        );

        await t.expect(
            selectors
                .cityView
                .parent
                .exists,
        )
            .notOk();

        return {
            ...context,
        };

    };
