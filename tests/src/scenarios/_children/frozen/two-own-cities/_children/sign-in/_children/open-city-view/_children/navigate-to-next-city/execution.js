// @flow

import {
    appModel,
} from '../../../../../../../../../../models/app';


import {
    selectors,
} from '../../../../../../../../../../models/selectors';

import type {
    ScenarioExecution,
} from '../../../../../../../../../types';
import type {
    TwoOwnCitiesScenarioContext,
} from '../../../../../../types';


export const execution: ScenarioExecution< TwoOwnCitiesScenarioContext, TwoOwnCitiesScenarioContext >
    = async (
        {
            context,
            t,
        },
    ) => {

        const {
            cityName2,
        } = context;

        await appModel.actions.navigateToNextCity(
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

