// @flow

import type {
    TestController,
} from 'testcafe';
import {
    Selector,
} from 'testcafe';
import type {
    CommonState,
} from '../../../../common/src/state/modules/types';
import {
    emptyCommonState,
} from '../../../../common/src/state/modules/state';
import {
    appModel,
} from '../../../models/app';
import {
    authModel,
} from '../../../models/auth';
import {
    generateCityName,
    generateId,
    generatePassword,
} from '../../../../common/src/utils';
import {
    tools,
} from '../../../tools';
import {
    selectors,
} from '../../../models/app/selectors';

fixture(
    `app`,
);

test(
    `presents a city creation window if user is new to the world`,
    async ( t: TestController, ) => {

        const password = generatePassword();
        const username = generateId();
        const worldId = generateId();

        const state: CommonState = {
            ...emptyCommonState,
        };

        await tools.createUsers(
            {
                users: [
                    {
                        password,
                        username,
                    },
                ],
            },
        );

        await tools.createWorld(
            {
                id: worldId,
                state,
            },
        );

        await appModel.actions.open(
            {
                t,
                worldId,
            },
        );

        await authModel.actions.signIn(
            {
                password,
                t,
                username,
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

    },
);

test(
    `creates a new city`,
    async ( t: TestController, ) => {

        const password = generatePassword();
        const username = generateId();
        const worldId = generateId();
        const cityName = generateCityName();

        const state: CommonState = {
            ...emptyCommonState,
        };

        await tools.createUsers(
            {
                users: [
                    {
                        password,
                        username,
                    },
                ],
            },
        );

        await tools.createWorld(
            {
                id: worldId,
                state,
            },
        );

        await appModel.actions.open(
            {
                t,
                worldId,
            },
        );

        await authModel.actions.signIn(
            {
                password,
                t,
                username,
            },
        );

        await appModel.actions.createCity(
            {
                name: cityName,
                t,
            },
        );

        await t.expect(
            selectors
                .cityTile
                .textContent)
            .contains(cityName);

    },
);
