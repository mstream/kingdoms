// @flow

import React, {useEffect, useState} from 'react';
import {WorldMapComponent} from '../world-map';
import {connect} from 'react-redux';
import type {Dispatch} from 'redux';
import {CityViewComponent} from '../city-view';
import type {ClientAction} from '../../state/actions';
import {MenuComponent} from '../menu';
import type {ClientState} from '../../state/state';
import {GameStartComponent} from '../game-start';

type OwnProps = {};

type StateProps = {};

type DispatchProps = {};

type Props = {
    ...OwnProps,
    ...StateProps,
    ...DispatchProps,
};

const Component = ({}: Props) => {
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
        []
    );

    const windowSize = {x: window.innerWidth, y: window.innerHeight};

    return (
        <div
            className="grid grid-rows-12 grid-flow-col h-screen w-screen font-gothic">
            <div className="row-span-1">
                <MenuComponent/>
            </div>
            <div className="row-span-11">
                <WorldMapComponent
                    windowSize={windowSize}
                />
                <CityViewComponent/>
                <GameStartComponent/>
            </div>
        </div>
    );
};

const mapStateToProps = (state: ClientState): StateProps => {
    return Object.freeze({});
};

const actionCreators: DispatchProps = Object.freeze({});

export const AppComponent = connect<Props,
    OwnProps,
    StateProps,
    DispatchProps,
    ClientState,
    Dispatch<ClientAction>>(
    mapStateToProps,
    // $FlowFixMe
    actionCreators
)(Component);
