/**
 * @flow
 */

import React, {useEffect, useState} from 'react';
import {WorldMapComponent} from '../world-map';
import {connect} from 'react-redux';
import type {Dispatch} from 'redux';
import {CityViewComponent} from '../city-view';
import type {ClientState} from '../../state/reducers/root';
import type {ClientAction} from '../../state/actions';
import {EMPTY_OBJECT} from '../../../../common/src/util';

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
    }, []);

    const windowSize = {x: window.innerWidth, y: window.innerHeight};

    return state != null ? (
        <div>
            <WorldMapComponent
                camera={state.camera}
                citiesById={state.cities.byId}
                tiles={state.tiles}
                windowSize={windowSize}
            />
            {
                state.menu.viewedCityId != null &&
                <CityViewComponent
                    city={state.cities.byId[state.menu.viewedCityId]}
                    cityId={state.menu.viewedCityId}
                />
            }
        </div>
    ) : (
        <div>loading...</div>
    );
};

const mapStateToProps = (state: ClientState): StateProps => {
    return {
        state
    };
};

const actionCreators: DispatchProps = EMPTY_OBJECT;

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
