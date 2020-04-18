// @flow

import {
    appModel,
} from '../../../../../models/app';

import {
    combineScenarios,
} from '../../../../utils';
import {
    generateCityName,
} from '../../../../../../../common/src/utils';

import {
    scenarios as openCityViewTestScenarios,
} from './open-city-view';
import {
    selectors,
} from '../../../../../models/app/selectors';
import type {
    CreateCityScenarioContext,
} from './types';

import type {
    Scenario, ScenarioExecution,
} from '../../../../types';
import type {
    SignInScenarioContext,
} from '../../types';


const name = `create city`;
const tags = [
    `positive`,
];

const execution: ScenarioExecution< SignInScenarioContext, CreateCityScenarioContext > = async ( {
    context,
    t,
}, ) => {

    const cityName = generateCityName();

    await appModel.actions.createCity(
        {
            name: cityName,
            t,
        },
    );

    await t.expect(
        selectors
            .cityTile
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


export const scenarios: $ReadOnlyArray< Scenario< SignInScenarioContext, CreateCityScenarioContext > >
    = combineScenarios(
        {
            children: [
                ...openCityViewTestScenarios,
            ],
            parent: {
                execution,
                name,
                tags,
            },
        },
    );
