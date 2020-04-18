// @flow

import {
    appModel,
} from '../../../../../../models/app';

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
        cityName,
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
