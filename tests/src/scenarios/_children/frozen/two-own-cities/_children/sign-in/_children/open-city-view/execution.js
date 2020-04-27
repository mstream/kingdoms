// @flow

import {
    appModel,
} from '../../../../../../../../models/app';


import {
    selectors,
} from '../../../../../../../../models/selectors';

import type {
    ScenarioExecution,
} from '../../../../../../../types';
import type {
    TwoOwnCitiesScenarioContext,
} from '../../../../types';

export const execution: ScenarioExecution< TwoOwnCitiesScenarioContext, TwoOwnCitiesScenarioContext >
    = async (
        {
            context,
            t,
        },
    ) => {

        const {
            cityName1,
        } = context;

        await appModel.actions.openCityView(
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

