// @flow

import jwt from 'jsonwebtoken';
import parseUrl from 'url-parse';
import queryString from 'query-string';
import type {
    Config,
} from '../config/types';
import type {
    IdTokenInfo,
} from '../types';
import type {
    Logger,
} from '../../../common/src/logging/types';

export const getIdTokenInfo = (
    {
        config,
        location,
        logger,
    }: {
        config: Config,
        location: Location,
        logger: Logger,
    },
): ?IdTokenInfo => {

    const locationHash = queryString.parse(
        location.hash,
    );

    const token = locationHash[ `id_token` ];

    if ( typeof token !== `string` ) {

        logger.info(
            {
                message: `No id token found in the location`,
            },
        );

        redirectToLoginPage(
            {
                config,
                location,
                logger,
            },
        );

        return null;

    }

    logger.debug(
        {
            interpolationValues: [
                token,
            ],
            message: `Token extracted from the location: %s`,
        },
    );

    const userInfo = jwt.decode(
        token,
    );

    logger.debug(
        {
            interpolationValues: [
                userInfo,
            ],
            message: `Decoded user info: %o`,
        },
    );

    if ( userInfo == null || userInfo[ `cognito:username` ] == null ) {

        logger.info(
            {
                message: `Cannot retrieve the username from the token. `
                    + `Redirecting to the login page...`,
            },
        );

        redirectToLoginPage(
            {
                config,
                location,
                logger,
            },
        );

        return;

    }

    const username = userInfo[ `cognito:username` ];

    return {
        token,
        username,
    };

};

export const getWorldId = (
    {
        location,
        logger,
    }: { location: Location, logger: Logger },
): ?string => {

    const locationHash = queryString.parse(
        location.hash,
    );

    const locationHashState = locationHash[ `state` ];

    logger.debug(
        {
            interpolationValues: [
                locationHashState,
            ],
            message: `State extracted from the location: %s`,
        },
    );

    const state = Array.isArray(
        locationHashState,
    )
        ? locationHashState[ 0 ]
        : locationHashState;

    return state == null
        ? null
        : state.toString();

};

const createAuthPageUrl = (
    {
        action,
        config,
        location,
        logger,
    }: {
        action: 'login' | 'logout',
        config: Config,
        location: Location,
        logger: Logger,
    },
): string => {

    logger.info(
        {
            message: `redirecting to the authentication website`,
        },
    );

    const redirectUri = `${ location.origin }${ location.pathname }`;

    const state = getWorldId(
        {
            location,
            logger,
        },
    );

    const stateStr
        = state == null
            ? ``
            : `&state=${ state }`;

    const baseUrl = `${ config.cognitoUrl }/${ action }`;

    return `${ baseUrl }?`
        + `client_id=${ config.clientId }&`
        + `response_type=token&`
        + `scope=email+openid&`
        + `redirect_uri=${ redirectUri }${ stateStr }`;

};

export const redirectToLoginPage = (
    {
        config,
        location,
        logger,
    }: {
        config: Config,
        location: Location,
        logger: Logger,
    },
): void => {

    const url = createAuthPageUrl(
        {
            action: `login`,
            config,
            location,
            logger,
        },
    );

    location.replace(
        url,
    );

};

export const redirectToLogoutPage = (
    {
        config,
        location,
        logger,
    }: {
        config: Config,
        location: Location,
        logger: Logger,
    },
): void => {

    const url = createAuthPageUrl(
        {
            action: `logout`,
            config,
            location,
            logger,
        },
    );

    location.replace(
        url,
    );

};


export const createWorldPageUrl = (
    {
        location,
        worldId,
    }: $ReadOnly< {|
        location: Location,
        worldId: string,
    |} >,
): string => {

    const url = parseUrl(
        location.href,
        {
        },
    );
    const {
        hash, pathname,
    } = url;

    url.set(
        `pathname`,
        `${ pathname }world.html`,
    );

    url.set(
        `hash`,
        `${ hash }&state=${ worldId }`,
    );

    return url.toString();

};
