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

    await appModel.actions.openOrdersTab(
        {
            t,
        },
    );

    await t.expect(
        selectors
            .cityView
            .ordersPanel
            .textContent,
    )
        .contains(
            `No orders`,
        );

    return {
        ...context,
    };

};

