// @flow

import {
    appModel,
} from '../../../../../../../../../../models/app';


import {
    selectors,
} from '../../../../../../../../../../models/selectors';
import type {
    CreateCityScenarioContext,
} from '../../types';
import type {
    ScenarioExecution,
} from '../../../../../../../../../types';

export const execution: ScenarioExecution< CreateCityScenarioContext, CreateCityScenarioContext > = async ( {
    context,
    t,
}, ) => {

    const {
        cityName,
    } = context;

    await appModel.actions.openCityView(
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
