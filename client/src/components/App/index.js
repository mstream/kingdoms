// @flow

import React, {useEffect, useState} from 'react';
import {WorldMapComponent} from '../world-map';
import {connect} from 'react-redux';
import type {Dispatch} from 'redux';
import {CityViewComponent} from '../city-view';
import type {ClientAction} from '../../state/actions';
import {MenuComponent} from '../menu';
import {GameStartComponent} from '../game-start';
import type {ClientState} from '../../state/state';

type OwnProps = {};

type StateProps = {
    state: ClientState
};

type DispatchProps = {};

type Props = {
    ...OwnProps,
    ...StateProps,
    ...DispatchProps,
};

const Component = ({state}: Props) => {
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

    return state.serverState != null ? (
        <div
            className="grid grid-rows-12 grid-flow-col h-screen w-screen font-gothic">
            <div className="row-span-1">
                <MenuComponent/>
            </div>
            <div className="row-span-11">
                <WorldMapComponent
                    camera={state.camera}
                    cities={state.serverState.cities}
                    tiles={state.tiles}
                    windowSize={windowSize}
                />
                {
                    state.menu.cityView.currentCityId != null &&
                    <CityViewComponent
                        city={state.serverState.cities[state.menu.cityView.currentCityId]}
                        cityId={state.menu.cityView.currentCityId}
                    />
                }
                {
                    state.player.name != null && state.serverState.citiesByOwner[state.player.name] == null &&
                    <GameStartComponent/>
                }
            </div>
        </div>
    ) : (
        <div/>
    );
};

const mapStateToProps = (state: ClientState): StateProps => {
    return {
        state
    };
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
