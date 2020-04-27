// @flow

import {
    appModel,
} from '../../../../../../../../../../models/app';


import {
    selectors,
} from '../../../../../../../../../../models/selectors';
import type {
    OneOwnCityScenarioContext,
} from '../../../../../../types';
import type {

    ScenarioExecution,
} from '../../../../../../../../../types';


export const execution: ScenarioExecution< OneOwnCityScenarioContext, OneOwnCityScenarioContext > = async ( {
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

