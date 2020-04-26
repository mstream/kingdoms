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

    await appModel.actions.closeCityView(
        {
            name: `non-existent`,
            t,
        },
    );

    await t.expect(
        selectors
            .cityView
            .parent
            .exists,
    )
        .notOk();

    return {
        ...context,
    };

};
