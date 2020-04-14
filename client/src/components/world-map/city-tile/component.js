// @flow

import React from 'react';
import type {
    Props,
} from './props';
import {
    createGeometryStyle,
} from '../../../utils';
import {
    ImageComponent,
} from '../../image';
import cityImage from '../../../assets/images/cities/city.png';
import {
    CityStatusBarComponent,
} from './status-bar';
import {
    testIds,
} from '../../../../../common/src/ui';


export const Component = (
    {
        city,
        cityId,
        cityTile,
        openAttackView,
        openCityView,
        playerName,
    }: Props,
) => {

    const style = {
        ...createGeometryStyle(
            {
                geometry: cityTile.geometry,
            },
        ),
    };

    const onClick = () => {

        city.ownerId === playerName
            ? openCityView(
                {
                    cityId,
                },
            )
            : openAttackView(
                {
                    cityId,
                },
            );

    };

    return (
        <div
            data-testid={testIds.COMPONENT_WORLD_MAP.CITY_TILE}
            className="absolute cursor-pointer"
            style={style}
            onClick={onClick}
        >
            <ImageComponent image={cityImage} ratio="100%"/>
            <CityStatusBarComponent city={city}/>
        </div>
    );

};
