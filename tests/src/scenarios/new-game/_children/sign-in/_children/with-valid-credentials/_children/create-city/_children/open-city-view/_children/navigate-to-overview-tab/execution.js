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

    const panelTextContent = await selectors
        .cityView
        .overviewPanel
        .textContent;


    await t.expect(
        selectors
            .cityView
            .overviewPanel
            .textContent,
    )
        .notEql(
            panelTextContent,
            `check if panel text content changes`,
            {
                timeout: 90000,
            },
        );

    return {
        ...context,
    };

};

