// @flow

import {
    CityTileComponent,
} from './city-tile';
import {
    TerrainTileComponent,
} from './terrain-tile';
import {
    addVectors,
    multipleVectors,
    subtractVectors,
} from '../../../../common/src/vector';
import {
    checkIfIntersect,
} from '../../../../common/src/geometry';
import {
    testIds,
} from '../../../../common/src/ui';
import React, {
    useEffect,
} from 'react';
import type {
    ClientStateTile,
} from '../../pages/world/state/modules/_children/tiles/reducer/types';
import type {
    Geometry,
} from '../../../../common/src/geometry';
import type {
    Props,
} from './props';
import type {
    Vector,
} from '../../../../common/src/vector';

const cullObjects = <T: $ReadOnly< { geometry: Geometry } >>( {
    objects,
    cameraGeometry,
}: {
    objects: $ReadOnlyArray< T >,
    cameraGeometry: Geometry,
}, ): $ReadOnlyArray< T > => {

    return objects.filter(
        (
            object,
        ) => {

            return checkIfIntersect(
                {
                    geometry1: object.geometry,
                    geometry2: cameraGeometry,
                },
            );

        },
    );

};

const transformObjectGeometries = <T: $ReadOnly< { geometry: Geometry } >>( {
    objects,
    cameraWindowGeometry,
    cameraLocationToWindowCenterLocationVector,
    desiredCameraSizeToWorldCameraSizeRatioVector,
}: {
    objects: $ReadOnlyArray< T >,
    cameraWindowGeometry: Geometry,
    cameraLocationToWindowCenterLocationVector: Vector,
    desiredCameraSizeToWorldCameraSizeRatioVector: Vector,
}, ): $ReadOnlyArray< T > => {

    return objects.map(
        (
            object,
        ) => {

            const windowGeometry = {
                location: addVectors(
                    {
                        vector1: object.geometry.location,
                        vector2: cameraLocationToWindowCenterLocationVector,
                    },
                ),
                size: multipleVectors(
                    {
                        vector1: object.geometry.size,
                        vector2: desiredCameraSizeToWorldCameraSizeRatioVector,
                    },
                ),
            };

            const distanceFromWindowCameraCenter = subtractVectors(
                {
                    vector1: windowGeometry.location,
                    vector2: cameraWindowGeometry.location,
                },
            );

            const zoomedLocation = {
                x:
                    cameraWindowGeometry.location.x
                    + (
                        distanceFromWindowCameraCenter.x
                        * desiredCameraSizeToWorldCameraSizeRatioVector.x
                    ),
                y:
                    cameraWindowGeometry.location.y
                    + (
                        distanceFromWindowCameraCenter.y
                        * desiredCameraSizeToWorldCameraSizeRatioVector.y
                    ),
            };
            return {
                ...object,
                geometry: {
                    location: zoomedLocation,
                    size    : {
                        x: Math.ceil(
                            windowGeometry.size.x,
                        ),
                        y: Math.ceil(
                            windowGeometry.size.y,
                        ),
                    },
                },
            };

        },
    );

};

export const Component = (
    {
        cameraGeometry,
        cities,
        isVisible,
        tiles,
        moveCameraUp,
        moveCameraDown,
        moveCameraLeft,
        moveCameraRight,
        windowSize,
        zoomCameraIn,
        zoomCameraOut,
    }: Props,
) => {

    useEffect(
        () => {

            window.addEventListener(
                `keydown`,
                (
                    event,
                ) => {

                    switch ( event.key ) {

                    case `ArrowUp`: {

                        moveCameraUp();
                        break;

                    }

                    case `ArrowDown`: {

                        moveCameraDown();
                        break;

                    }

                    case `ArrowLeft`: {

                        moveCameraLeft();
                        break;

                    }

                    case `ArrowRight`: {

                        moveCameraRight();
                        break;

                    }

                    case `[`: {

                        zoomCameraOut();
                        break;

                    }

                    case `]`: {

                        zoomCameraIn();
                        break;

                    }

                    default: {

                        break;

                    }

                    }

                },
            );

        },
        [
            moveCameraUp,
            moveCameraDown,
            moveCameraLeft,
            moveCameraRight,
            zoomCameraIn,
            zoomCameraOut,
        ],
    );

    if ( !isVisible ) {

        return null;

    }

    const windowCenterLocation = multipleVectors(
        {
            vector1: windowSize,
            vector2: {
                x: 0.5,
                y: 0.5,
            },
        },
    );

    const cameraLocationToWindowCenterLocationVector = subtractVectors(
        {
            vector1: windowCenterLocation,
            vector2: cameraGeometry.location,
        },
    );

    const desiredDimensionRatio = Math.max(
        windowSize.x / cameraGeometry.size.x,
        windowSize.y / cameraGeometry.size.y,
    );

    const desiredCameraSizeToWorldCameraSizeRatioVector = {
        x: desiredDimensionRatio,
        y: desiredDimensionRatio,
    };

    const visibleTerrainTiles = cullObjects(
        {
            cameraGeometry,
            objects: tiles.terrain,
        },
    );

    const visibleCityIds: $ReadOnlyArray< string > = Object.keys(
        cities,
    )
        .reduce(
            (
                visibleCityIds, cityId,
            ) => {

                const tile = tiles.city[ cityId ];

                const isVisible = checkIfIntersect(
                    {
                        geometry1: tile.geometry,
                        geometry2: cameraGeometry,
                    },
                );

                return [
                    ...visibleCityIds,
                    ...(
                        isVisible
                            ? [
                                cityId,
                            ]
                            : []
                    ),
                ];

            },
            [],
        );

    const visibleCityTiles: $ReadOnlyArray< ClientStateTile > = visibleCityIds.map(
        (
            cityId,
        ) => {

            return tiles.city[ cityId ];

        },
    );

    const cameraWindowGeometry = {
        location: addVectors(
            {
                vector1: cameraGeometry.location,
                vector2: cameraLocationToWindowCenterLocationVector,
            },
        ),
        size: multipleVectors(
            {
                vector1: cameraGeometry.size,
                vector2: desiredCameraSizeToWorldCameraSizeRatioVector,
            },
        ),
    };

    const transformedVisibleTiles = transformObjectGeometries(
        {
            cameraLocationToWindowCenterLocationVector,
            cameraWindowGeometry,
            desiredCameraSizeToWorldCameraSizeRatioVector,
            objects: visibleTerrainTiles,
        },
    );

    const transformedVisibleCityTiles = transformObjectGeometries(
        {
            cameraLocationToWindowCenterLocationVector,
            cameraWindowGeometry,
            desiredCameraSizeToWorldCameraSizeRatioVector,
            objects: visibleCityTiles,
        },
    );

    const terrainTileComponents = transformedVisibleTiles.map(
        (
            tile,
        ) => {

            return (
                <TerrainTileComponent
                    key={`${ tile.index.x }-${ tile.index.y }`}
                    tile={tile}
                />
            );

        },
    );

    const cityTileComponents = visibleCityIds.map(
        (
            cityId, index,
        ) => {

            return (
                <CityTileComponent
                    key={cityId}
                    city={cities[ cityId ]}
                    cityId={cityId}
                    cityTile={transformedVisibleCityTiles[ index ]}
                />
            );

        },
    );

    return (
        <div data-testid={testIds.worldMap.parent}>
            {terrainTileComponents}
            {cityTileComponents}
        </div>
    );

};
