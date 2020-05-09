// @flow


import {
    Selector,
} from 'testcafe';
import {
    mainPageModel,
} from '../../../../../../../../../../models/app/main-page';
import {
    worldPageModel,
} from '../../../../../../../../../../models/app/world-page';
import type {
    ScenarioExecution,
} from '../../../../../../../../../types';
import type {
    SignInScenarioContext,
} from '../../../../types';

type Execution = ScenarioExecution< SignInScenarioContext, SignInScenarioContext >;

export const execution: Execution
    = async (
        {
            context, logger, t,
        },
    ) => {

        const {
            worldId,
        } = context;

        await mainPageModel.actions.navigateToWorld(
            {
                logger,
                t,
                worldId,
            },
        );

        await worldPageModel.expectations.isAtAppWorldPage(
            {
                t,
            },
        );

        await t.expect(
            Selector(
                `*`,
            )
                .withExactText(
                    `Start game`,
                ).exists,
        )
            .ok();

        return context;

    };

