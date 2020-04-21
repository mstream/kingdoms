// @flow

import {
    appModel,
} from '../../../../../../models/app';
import {
    scenarios as changeCityNameScenarios,
} from './change-city-name';
import {
    scenarios as closeCityViewScenarios,
} from './close-city-view';
import {
    combineScenarios,
} from '../../../../../utils';
import {
    selectors,
} from '../../../../../../models/app/selectors';
import type {
    CreateCityScenarioContext,
} from '../types';
import type {
    Scenario, ScenarioExecution,
} from '../../../../../types';


const name = `open city view`;

const tags = [
    `city-view`,
    `positive`,
];

const execution: ScenarioExecution< CreateCityScenarioContext, CreateCityScenarioContext > = async ( {
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
            .textContent,
    )
        .contains(
            cityName,
        );

    return {
        ...context,
    };

};


export const scenarios: $ReadOnlyArray< Scenario< CreateCityScenarioContext, CreateCityScenarioContext > >
    = combineScenarios(
        {
            children: [
                ...changeCityNameScenarios,
                ...closeCityViewScenarios,
            ],
            parent: {
                execution,
                name,
                tags,
            },
        },
    );
