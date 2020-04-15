// @flow

import {
    CityStatusBarComponent,
} from './status-bar';
import {
    ImageComponent,
} from '../../image';
import {
    createGeometryStyle,
} from '../../../utils';
import {
    testIds,
} from '../../../../../common/src/ui';
import React from 'react';
import cityImage from '../../../assets/images/cities/city.png';
import type {
    Props,
} from './props';


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
