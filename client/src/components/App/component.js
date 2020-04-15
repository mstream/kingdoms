// @flow

import {
    AttackViewComponent,
} from '../attack-view';
import {
    CityViewComponent,
} from '../city-view';
import {
    ErrorsComponent,
} from '../errors';
import {
    GameStartComponent,
} from '../game-start';
import {
    LoaderComponent,
} from '../loader';
import {
    MenuComponent,
} from '../menu';
import {
    WorldMapComponent,
} from '../world-map';
import {
    testIds,
} from '../../../../common/src/ui';
import React, {
    useEffect, useState,
} from 'react';
import classNames from 'classnames';


export const Component = () => {

    const [
        , setState,
    ] = useState(
        true,
    );

    const handleWindowResize = () => {

        setState(
            (
                val,
            ) => {

                return !val;

            },
        );

    };

    useEffect(
        () => {

            window.addEventListener(
                `resize`,
                handleWindowResize,
            );

            return () => {

                window.removeEventListener(
                    `resize`,
                    handleWindowResize,
                );

            };

        },
        [],
    );

    const windowSize = {
        x: window.innerWidth,
        y: window.innerHeight,
    };

    return (
        <div data-testid={testIds.COMPONENT_APP.PARENT}>
            <div
                className={classNames(
                    `grid`,
                    `grid-rows-12`,
                    `grid-flow-col`,
                    `h-screen`,
                    `w-screen`,
                    `font-gothic`,
                    `cursor-default`,
                    `select-none`,
                )}>
                <div className="row-span-1">
                    <MenuComponent/>
                </div>
                <div className="row-span-11">
                    <WorldMapComponent windowSize={windowSize}/>
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
