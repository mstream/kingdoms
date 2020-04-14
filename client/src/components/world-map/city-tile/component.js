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

export const testId = `city-tile`;

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
            data-testid={testId}
            className="absolute cursor-pointer"
            style={style}
            onClick={onClick}
        >
            <ImageComponent image={cityImage} ratio="100%"/>
            <CityStatusBarComponent city={city}/>
        </div>
    );

};
