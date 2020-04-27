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


export const execution: ScenarioExecution< CreateCityScenarioContext, CreateCityScenarioContext > = async ( {
    context,
    t,
}, ) => {

    await appModel.actions.openResourcesTab(
        {
            t,
        },
    );

    await t.expect(
        selectors
            .cityView
            .resourcesPanel
            .textContent,
    )
        .contains(
            `Food`,
        );

    await t.expect(
        selectors
            .cityView
            .resourcesPanel
            .textContent,
    )
        .contains(
            `Wood`,
        );

    return {
        ...context,
    };

};

