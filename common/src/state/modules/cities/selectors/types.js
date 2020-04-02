// @flow

import type { CommonStateCity } from '../reducer/types';

export type CityDistances = $ReadOnly<{
    [string]: number,
    ...,
}>;

export type CitiesDistances = $ReadOnly<{
    [string]: CityDistances,
    ...,
}>;

export type CityIdsByOwner = $ReadOnly<{
    [string]: $ReadOnlyArray<string>,
    ...,
}>;

export type CitiesByOwner = $ReadOnly<{
    [string]: $ReadOnlyArray<CommonStateCity>,
    ...,
}>;
