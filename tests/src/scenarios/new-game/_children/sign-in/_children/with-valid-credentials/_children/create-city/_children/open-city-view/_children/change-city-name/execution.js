// @flow

import {
    appModel,
} from '../../../../../../../../../../../../models/app';


import {
    generateCityName,
} from '../../../../../../../../../../../../../../common/src/utils';
import {
    selectors,
} from '../../../../../../../../../../../../models/app/selectors';
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

    const newCityName = generateCityName();


    await appModel.actions.changeCityName(
        {
            name: newCityName,
            t,
        },
    );

    await t.expect(
        selectors
            .cityViewName.textContent,
    )
        .contains(
            newCityName,
        );

    return {
        ...context,
        cityName: newCityName,
    };

};

