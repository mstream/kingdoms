// @flow

import {
    appModel,
} from '../../../../../../../../../../../../models/app';


import {
    selectors,
} from '../../../../../../../../../../../../models/selectors';
import type {
    CreateCityScenarioContext,
} from '../../../../types';
import type {

    ScenarioExecution,
} from '../../../../../../../../../../../types';


export const execution: ScenarioExecution< CreateCityScenarioContext, CreateCityScenarioContext > = async ( {
    context,
    t,
}, ) => {

    await appModel.actions.openOverviewTab(
        {
            t,
        },
    );

    await t.expect(
        selectors
            .cityView
            .overviewPanel
            .textContent,
    )
        .contains(
            `Buildings`,
        );

    await t.expect(
        selectors
            .cityView
            .overviewPanel
            .textContent,
    )
        .contains(
            `Resources`,
        );

    await t.expect(
        selectors
            .cityView
            .overviewPanel
            .textContent,
    )
        .contains(
            `Orders`,
        );

    await t.expect(
        selectors
            .cityView
            .overviewPanel
            .textContent,
    )
        .contains(
            `Units`,
        );

    await t.expect(
        selectors
            .cityView
            .overviewPanel
            .textContent,
    )
        .contains(
            `Peasants: 0`,
        );

    await t.expect(
        selectors
            .cityView
            .overviewPanel
            .textContent,
    )
        .contains(
            `Army: 0`,
        );

    await t.expect(
        selectors
            .cityView
            .overviewPanel
            .textContent,
    )
        .contains(
            `Nobles: 0`,
        );

    return {
        ...context,
    };

};

