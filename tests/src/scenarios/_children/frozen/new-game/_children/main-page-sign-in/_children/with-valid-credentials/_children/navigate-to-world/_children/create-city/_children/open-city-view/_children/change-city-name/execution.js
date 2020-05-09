// @flow

import {
    worldPageModel,
} from '../../../../../../../../../../../../../../../../models/app/world-page';


import {
    generateCityName,
} from '../../../../../../../../../../../../../../../../../../common/src/utils';
import {
    selectors,
} from '../../../../../../../../../../../../../../../../models/selectors';
import type {
    CreateCityScenarioContext,
} from '../../../../types';
import type {
    ScenarioExecution,
} from '../../../../../../../../../../../../../../../types';

type Execution = ScenarioExecution< CreateCityScenarioContext,
    CreateCityScenarioContext >;

export const execution: Execution
    = async (
        {
            context,
            t,
        },
    ) => {

        const newCityName = generateCityName();


        await worldPageModel.actions.changeCityName(
            {
                name: newCityName,
                t,
            },
        );

        await t.expect(
            selectors
                .cityView
                .name
                .textContent,
        )
            .contains(
                newCityName,
            );

        return {
            ...context,
            cityName: newCityName,
        };

    };

