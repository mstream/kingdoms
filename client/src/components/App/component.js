// @flow

import React, { useEffect, useState } from 'react';
import type { Props } from './props';
import { MenuComponent } from '../menu';
import { WorldMapComponent } from '../world-map';
import { CityViewComponent } from '../city-view';
import { GameStartComponent } from '../game-start';
import { LoaderComponent } from '../loader';
import { AttackViewComponent } from '../attack-view';
import { ErrorsComponent } from '../errors';

export const testId = 'app';

export const Component = ({}: Props) => {

    const [, setState] = useState(true);

    const handleWindowResize = () => {
        setState(val => !val);
    };

    useEffect(() => {
            window.addEventListener('resize', handleWindowResize);

            return () => {
                window.removeEventListener('resize', handleWindowResize);
            };
        },
        [],
    );

    const windowSize = { x: window.innerWidth, y: window.innerHeight };

    return (
        <div data-testid={testId}>
            <div
                className="grid grid-rows-12 grid-flow-col h-screen w-screen font-gothic cursor-default">
                <div className="row-span-1">
                    <MenuComponent/>
                </div>
                <div className="row-span-11">
                    <WorldMapComponent
                        windowSize={windowSize}
                    />
                    <CityViewComponent/>
                    <AttackViewComponent/>
                    <GameStartComponent/>
                </div>
                <LoaderComponent/>
            </div>
            <ErrorsComponent/>
        </div>

    );
};
