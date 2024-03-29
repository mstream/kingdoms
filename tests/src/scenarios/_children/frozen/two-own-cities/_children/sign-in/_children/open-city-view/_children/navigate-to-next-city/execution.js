// @flow

import {
    worldPageModel,
} from '../../../../../../../../../../models/app/world-page';


import {
    selectors,
} from '../../../../../../../../../../models/selectors';
import type {
    ScenarioExecution,
} from '../../../../../../../../../types';
import type {
    TwoOwnCitiesScenarioContext,
} from '../../../../../../types';


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
            cityName2,
        } = context;

        await worldPageModel.actions.navigateToNextCity(
            {
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
                cityName2,
            );

        return {
            ...context,
        };

    };

