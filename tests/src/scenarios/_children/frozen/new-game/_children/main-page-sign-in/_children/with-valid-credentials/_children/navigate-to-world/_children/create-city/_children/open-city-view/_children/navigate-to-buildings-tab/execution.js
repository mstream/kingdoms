// @flow

import {
    worldPageModel,
} from '../../../../../../../../../../../../../../../../models/app/world-page';


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

        await worldPageModel.actions.openBuildingsTab(
            {
                t,
            },
        );

        await t.expect(
            selectors
                .cityView
                .buildingsPanel
                .textContent,
        )
            .contains(
                `Lumber mill`,
            );

        await t.expect(
            selectors
                .cityView
                .buildingsPanel
                .textContent,
        )
            .contains(
                `Pasture`,
            );

        await t.expect(
            selectors
                .cityView
                .buildingsPanel
                .textContent,
        )
            .contains(
                `Warehouse`,
            );

        return {
            ...context,
        };

    };

