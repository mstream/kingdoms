// @flow

import {
    appModel,
} from '../../../../../../../models/app';

import {
    combineScenarios,
} from '../../../../../../utils';
import {
    selectors,
} from '../../../../../../../models/app/selectors';
import type {
    CreateCityScenarioContext,
} from '../../types';
import type {
    Scenario, ScenarioExecution,
} from '../../../../../../types';


const name = `close city view`;

const tags = [
    `positive`,
];

const execution: ScenarioExecution< CreateCityScenarioContext, CreateCityScenarioContext > = async ( {
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
            .exists,
    )
        .notOk();

    return {
        ...context,
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
