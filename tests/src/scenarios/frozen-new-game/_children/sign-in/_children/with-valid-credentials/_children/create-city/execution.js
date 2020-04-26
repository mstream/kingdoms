// @flow

import {
    appModel,
} from '../../../../../../../../models/app';
import {
    generateCityName,
} from '../../../../../../../../../../common/src/utils';
import {
    selectors,
} from '../../../../../../../../models/selectors';
import type {
    CreateCityScenarioContext,
} from './types';

import type {
    ScenarioExecution,
} from '../../../../../../../types';
import type {
    SignInScenarioContext,
} from '../../../../types';


export const execution: ScenarioExecution< SignInScenarioContext, CreateCityScenarioContext > = async ( {
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
            .worldMap
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

