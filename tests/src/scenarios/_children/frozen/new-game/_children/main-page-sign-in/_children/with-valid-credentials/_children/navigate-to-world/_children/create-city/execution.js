// @flow

import {
    generateCityName,
} from '../../../../../../../../../../../../../../common/src/utils';
import {
    selectors,
} from '../../../../../../../../../../../../models/selectors';
import {
    worldPageModel,
} from '../../../../../../../../../../../../models/app/world-page';
import type {
    CreateCityScenarioContext,
} from './types';

import type {
    ScenarioExecution,
} from '../../../../../../../../../../../types';
import type {
    SignInScenarioContext,
} from '../../../../../../types';

type Execution =
    ScenarioExecution< SignInScenarioContext, CreateCityScenarioContext >;

export const execution: Execution
    = async ( {
        context,
        t,
    }, ) => {

        const cityName = generateCityName();

        await worldPageModel.actions.createCity(
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

