// @flow

import {
    worldPageModel,
} from '../../../../../../../../models/app/world-page';


import {
    selectors,
} from '../../../../../../../../models/selectors';
import type {
    OneOwnCityScenarioContext,
} from '../../../../types';
import type {
    ScenarioExecution,
} from '../../../../../../../types';

type Execution = ScenarioExecution< OneOwnCityScenarioContext,
    OneOwnCityScenarioContext >;

export const execution: Execution
    = async (
        {
            context,
            t,
        },
    ) => {

        const {
            cityName,
        } = context;

        await worldPageModel.actions.openCityView(
            {
                name: cityName,
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
                cityName,
            );

        return {
            ...context,
        };

    };

