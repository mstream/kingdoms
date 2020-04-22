// @flow

import {
    appModel,
} from '../../../../../../../../../../../../models/app';


import {
    selectors,
} from '../../../../../../../../../../../../models/selectors';
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

    await appModel.actions.openUnitsTab(
        {
            t,
        },
    );

    await t.expect(
        selectors
            .cityView
            .unitsPanel
            .textContent,
    )
        .contains(
            `Archers`,
        );

    await t.expect(
        selectors
            .cityView
            .unitsPanel
            .textContent,
    )
        .contains(
            `Catapults`,
        );

    await t.expect(
        selectors
            .cityView
            .unitsPanel
            .textContent,
    )
        .contains(
            `Knights`,
        );

    await t.expect(
        selectors
            .cityView
            .unitsPanel
            .textContent,
    )
        .contains(
            `Nobles`,
        );

    await t.expect(
        selectors
            .cityView
            .unitsPanel
            .textContent,
    )
        .contains(
            `Pikemen`,
        );

    await t.expect(
        selectors
            .cityView
            .unitsPanel
            .textContent,
    )
        .contains(
            `Peasants`,
        );

    await t.expect(
        selectors
            .cityView
            .unitsPanel
            .textContent,
    )
        .contains(
            `Swordsmen`,
        );

    return {
        ...context,
    };

};

