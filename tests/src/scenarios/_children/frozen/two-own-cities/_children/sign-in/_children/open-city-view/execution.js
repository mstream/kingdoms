// @flow

import {
    worldPageModel,
} from '../../../../../../../../models/app/world-page';


import {
    selectors,
} from '../../../../../../../../models/selectors';


import type {
    ScenarioExecution,
} from '../../../../../../../types';
import type {
    TwoOwnCitiesScenarioContext,
} from '../../../../types';

type Execution = ScenarioExecution< TwoOwnCitiesScenarioContext,
    TwoOwnCitiesScenarioContext >;

export const execution: Execution
    = async (
        {
            context,
            t,
        },
    ) => {

        const {
            cityName1,
        } = context;

        await worldPageModel.actions.openCityView(
            {
                name: cityName1,
                t,
            },
        );

        await t.expect(
            selectors
                .cityView
                .parent
                .textContent,
        )
            .contains(
                cityName1,
            );

        return {
            ...context,
        };

    };

