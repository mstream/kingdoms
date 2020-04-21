// @flow

import {
    appModel,
} from '../../../../../../../models/app';

import {
    combineScenarios,
} from '../../../../../../utils';
import {
    generateCityName,
} from '../../../../../../../../../common/src/utils';
import {
    selectors,
} from '../../../../../../../models/app/selectors';
import type {
    CreateCityScenarioContext,
} from '../../types';
import type {
    Scenario, ScenarioExecution,
} from '../../../../../../types';


const name = `change city name`;

const tags = [
    `city-view`,
    `positive`,
];

const execution: ScenarioExecution< CreateCityScenarioContext, CreateCityScenarioContext > = async ( {
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


export const scenarios: $ReadOnlyArray< Scenario< CreateCityScenarioContext, CreateCityScenarioContext > >
    = combineScenarios(
        {
            children: [],
            parent  : {
                execution,
                name,
                tags,
            },
        },
    );
