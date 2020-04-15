// @flow

import {
    TestController,
} from 'testcafe';
import {
    config,
} from '../../config';
import {
    selectors,
} from './selectors';

const createCity = async ( {
    name,
    t,
}: {
    name: string,
    t: TestController,
}, ): Promise< void > => {

    await t.typeText(
        selectors.newCityNameInput,
        name,
    );

    await t.click(
        selectors.newCityCreateButton,
    );

};

const open = async ( {
    t,
    token,
    worldId,
}: {
    t: TestController,
    token?: string,
    worldId: string,
}, ): Promise< void > => {

    const worldIdHashParam = `state=${ worldId }`;

    const tokenHashParam = token == null
        ? ``
        : `&id_token=${ token }`;

    const hashParams = `#${ worldIdHashParam }${ tokenHashParam }`;
    const url = `${ config.appUrl }/${ hashParams }`;

    console.info(
        `navigating to the app page using url: ${ url }`,
    );

    await t.navigateTo(
        url,
    );

};

const signOut = async ( {
    t,
}: { t: TestController }, ): Promise< void > => {

    await t.hover(
        selectors.userMenuButton,
    )
        .click(
            selectors.signOutButton,
        );

};

export const actions = {
    createCity,
    open,
    signOut,
};
