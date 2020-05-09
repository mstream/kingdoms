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


const openMainPage = async (
    {
        logger,
        t,
        token,
    }: $ReadOnly< {|
        logger: Logger,
        t: TestController,
        token?: string,
    |} >,
): Promise< void > => {


    const tokenHashParam = token == null
        ? ``
        : `&id_token=${ token }`;

    const hashParams = `#${ tokenHashParam }`;
    const url = `${ config.appUrl }/${ hashParams }`;

    logger.info(
        {
            interpolationValues: [
                url,
            ],
            message: `navigating to the app main page using url: %s`,
        },
    );

    await t.navigateTo(
        url,
    );

};

const navigateToWorld = async (
    {
        logger,
        t,
        worldId,
    }: $ReadOnly< {|
        logger: Logger,
        t: TestController,
        worldId: string,
    |} >,
): Promise< void > => {

    logger.info(
        {
            interpolationValues: [
                worldId,
            ],
            message: `navigating to world %s`,
        },
    );

    await t.click(
        selectors
            .mainPage
            .parent
            .find(
                `*`,
            )
            .withExactText(
                worldId,
            ),
    );

};


export const actions = {
    navigateToWorld,
    openMainPage,
};
