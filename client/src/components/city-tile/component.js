// @flow

import React from 'react';
import type { Props } from './props';
import { createGeometryStyle } from '../../util';
import { ImageComponent } from '../image';
import cityImage from '../../assets/images/cities/city.png';
import { CityStatusBarComponent } from '../city-status-bar';

export const testId = 'city-tile';

export const Component = ({ city, cityId, cityTile, openCityView }: Props) => {
    const style = {
        ...createGeometryStyle({ geometry: cityTile.geometry }),
    };

    return (
        <div data-testid={testId}
             className="absolute cursor-pointer"
             style={style}
             onClick={() => openCityView({ cityId })}
        >
            <ImageComponent image={cityImage} ratio="100%"/>
            <CityStatusBarComponent city={city}/>
        </div>
    );
};
