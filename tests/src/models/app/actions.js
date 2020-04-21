// @flow

import { TestController } from 'testcafe';
import { config } from '../../config';
import { selectors } from './selectors';
import type { Logger } from '../../../../common/src/logging/types';

const createCity = async ({
                              name,
                              t,
                          }: {
    name: string,
    t: TestController,
}): Promise<void> => {

    await t.typeText(
        selectors.newCityNameInput,
        name,
    );

    await t.click(
        selectors.newCityCreateButton,
    );

};

const changeCityName = async ({
                                  name,
                                  t,
                              }: {
    name: string,
    t: TestController,
}): Promise<void> => {

    await t.click(
        selectors.cityViewName,
    );

    await t.pressKey('ctrl+a');
    await t.pressKey('delete');

    await t.typeText(
        selectors.cityViewName,
        name,
    );

    await t.pressKey(
        `enter`,
    );

};

const open = async ({
                        logger,
                        t,
                        token,
                        worldId,
                    }: {
    logger: Logger,
    t: TestController,
    token?: string,
    worldId: string,
}): Promise<void> => {

    const worldIdHashParam = `state=${worldId}`;

    const tokenHashParam = token == null
        ? ``
        : `&id_token=${token}`;

    const hashParams = `#${worldIdHashParam}${tokenHashParam}`;
    const url = `${config.appUrl}/${hashParams}`;

    logger.info(
        `navigating to the app page using url: ${url}`,
    );

    await t.navigateTo(
        url,
    );

};

const closeCityView = async ({
                                 t,
                             }: {
    t: TestController,
}): Promise<void> => {

    await t.click(
        selectors.cityViewBackground,
        {
            offsetX: -1,
            offsetY: -1,
        },
    );

};

const openCityView = async ({
                                name,
                                t,
                            }: {
    name: string,
    t: TestController,
}): Promise<void> => {

    await t.click(
        selectors.cityTile.find(
            `*`,
        )
            .withExactText(
                name,
            ),
    );

};

const signOut = async ({
                           t,
                       }: { t: TestController }): Promise<void> => {

    await t.hover(
        selectors.userMenuButton,
    )
        .click(
            selectors.signOutButton,
        );

};

export const actions = {
    changeCityName,
    closeCityView,
    createCity,
    open,
    openCityView,
    signOut,
};
