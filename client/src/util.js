// @flow

import type { Geometry } from '../../common/src/geometry';
import type { Vector } from '../../common/src/vector';
import { multipleVectors } from '../../common/src/vector';
import { config } from './config';
import queryString from 'query-string';
import type { IdTokenInfo } from './types';
import jwt from 'jsonwebtoken';

export type GeometryStyle = $ReadOnly<{
    height: number,
    width: number,
    marginTop: number,
    marginLeft: number,
}>;

const tileSize = {
    x: 64,
    y: 64,
};

export const createGeometryStyle = ({
                                        geometry,
                                    }: {
    geometry: Geometry,
}): GeometryStyle => {
    return {
        height: geometry.size.y,
        width: geometry.size.x,
        marginTop: geometry.location.y - geometry.size.y / 2,
        marginLeft: geometry.location.x - geometry.size.x / 2,
    };
};

export const getRefValue = <T>({ ref }: { ref: { current: ?T } }): T => {
    if (ref.current == null) {
        throw Error('ref durationInMinutes not set');
    }
    return ref.current;
};

export const tileVectorToPixelVector = ({ tileVector }: { tileVector: Vector }): Vector => {
    return multipleVectors({
        vector1: tileVector,
        vector2: tileSize,
    });
};

export const redirectToLoginPage = ({ location }: { location: Location }): void => {
    console.log('redirecting to the authentication website');
    location.replace(config.cognitoSignOutUrl);
};

export const getIdTokenInfo = ({ location }: { location: Location }): ?IdTokenInfo => {
    const locationHash = queryString.parse(location.hash);
    const token = locationHash['id_token'];

    if (typeof token !== 'string') {
        console.log('no id token');
        redirectToLoginPage({ location });
        return null;
    }

    const userInfo = jwt.decode(token);

    if (userInfo == null || userInfo['cognito:username'] == null) {
        console.log(`cannot retrieve the username from the token`);
        redirectToLoginPage({ location });
        return;
    }

    const username = userInfo['cognito:username'];

    return {
        token,
        username,
    };
};
