// @flow

import {
    createWorldPageUrl,
} from '../../location';
import {
    testIds,
} from '../../../../common/src/ui';
import React from 'react';
import type {
    Props,
} from './props';


export const Component = (
    {
        worldIds,
    }: Props,
) => {


    const worldComponents = worldIds.map(
        (
            worldId: string,
        ) => {

            const url = createWorldPageUrl(
                {
                    location: window.location,
                    worldId,
                },
            );

            return <li key={worldId}>
                <a href={url}>
                    {worldId}
                </a>
            </li>;

        },
    );

    return (
        <div
            data-testid={testIds.worldList.parent}
            className="flex flex-col items-center text-gray-100"
        >
            <div className="bg-gray-900">
                <p>Worlds</p>
                <ul>{worldComponents}</ul>
            </div>
        </div>
    );

};
