// @flow

import {
    TestController,
} from 'testcafe';

import {
    config,
} from '../../../config';
import {
    selectors,
} from '../../selectors';
import type {
    Logger,
} from '../../../../../common/src/logging/types';

const createCity = async ( {
    name,
    t,
}: {
    name: string,
    t: TestController,
}, ): Promise< void > => {

    await t.typeText(
        selectors
            .gameStart
            .cityNameInput,
        name,
    );

    await t.click(
        selectors
            .gameStart
            .createCityButton,
    );

};

const changeCityName = async ( {
    name,
    t,
}: {
    name: string,
    t: TestController,
}, ): Promise< void > => {

    await t.click(
        selectors
            .cityView
            .name,
    );

    await t.pressKey(
        `ctrl+a`,
    );

    await t.pressKey(
        `delete`,
    );

    await t.typeText(
        selectors
            .cityView
            .name,
        name,
    );

    await t.pressKey(
        `enter`,
    );

};

const openWorldPage = async ( {
    logger,
    t,
    token,
    worldId,
}: {
    logger: Logger,
    t: TestController,
    token?: string,
    worldId: string,
}, ): Promise< void > => {

    const worldIdHashParam = `state=${ worldId }`;

    const tokenHashParam = token == null
        ? ``
        : `&id_token=${ token }`;

    const hashParams = `#${ worldIdHashParam }${ tokenHashParam }`;
    const url = `${ config.appUrl }/world.html${ hashParams }`;

    logger.info(
        {
            interpolationValues: [
                url,
            ],
            message: `navigating to the app page using url: %s`,
        },
    );

    await t.navigateTo(
        url,
    );

};

const closeCityView = async ( {
    t,
}: {
    t: TestController,
}, ): Promise< void > => {

    await t.click(
        selectors
            .cityView
            .background,
        {
            offsetX: -1,
            offsetY: -1,
        },
    );

};

const navigateToNextCity = async ( {
    t,
}: {
    t: TestController,
}, ): Promise< void > => {

    await t.click(
        selectors
            .cityView
            .nextCityButton,
    );

};

const navigateToPreviousCity = async ( {
    t,
}: {
    t: TestController,
}, ): Promise< void > => {

    await t.click(
        selectors
            .cityView
            .previousCityButton,
    );

};

const openCityView = async ( {
    name,
    t,
}: {
    name: string,
    t: TestController,
}, ): Promise< void > => {

    await t.click(
        selectors
            .worldMap
            .cityTile
            .find(
                `*`,
            )
            .withExactText(
                name,
            ),
    );

};

const openBuildingsTab = async ( {
    t,
}: {
    t: TestController,
}, ): Promise< void > => {

    await t.click(
        selectors
            .cityView
            .buildingsTab,
    );

};

const openOrdersTab = async ( {
    t,
}: {
    t: TestController,
}, ): Promise< void > => {

    await t.click(
        selectors
            .cityView
            .ordersTab,
    );

};

const openOverviewTab = async ( {
    t,
}: {
    t: TestController,
}, ): Promise< void > => {

    await t.click(
        selectors
            .cityView
            .overviewTab,
    );

};

const openResourcesTab = async ( {
    t,
}: {
    t: TestController,
}, ): Promise< void > => {

    await t.click(
        selectors
            .cityView
            .resourcesTab,
    );

};

const openUnitsTab = async ( {
    t,
}: {
    t: TestController,
}, ): Promise< void > => {

    await t.click(
        selectors
            .cityView
            .unitsTab,
    );

};

const signOut = async ( {
    t,
}: { t: TestController }, ): Promise< void > => {

    await t.hover(
        selectors
            .menu
            .userMenuDropdownButton,
    )
        .click(
            selectors
                .menu
                .signOutButton,
        );

};

export const actions = {
    changeCityName,
    closeCityView,
    createCity,
    navigateToNextCity,
    navigateToPreviousCity,
    openBuildingsTab,
    openCityView,
    openOrdersTab,
    openOverviewTab,
    openResourcesTab,
    openUnitsTab,
    openWorldPage,
    signOut,
};
