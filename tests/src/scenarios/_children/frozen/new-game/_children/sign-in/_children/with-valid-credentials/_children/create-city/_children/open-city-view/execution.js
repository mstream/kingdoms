// @flow

import {
    appModel,
} from '../../../../../../../../../../../../models/app';


import {
    selectors,
} from '../../../../../../../../../../../../models/selectors';
import type {
    CreateCityScenarioContext,
} from '../../types';
import type {
    ScenarioExecution,
} from '../../../../../../../../../../../types';

type Execution = ScenarioExecution< CreateCityScenarioContext,
    CreateCityScenarioContext >;

export const execution: Execution
    = async ( {
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

