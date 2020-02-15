/**
 * @flow
 */

import React, {useEffect, useState} from 'react';
import './style.css';
import {WorldMapComponent} from '../world-map';
import {connect} from 'react-redux';
import type {Dispatch} from 'redux';
import {CityViewComponent} from '../city-view';
import {EMPTY_OBJECT} from '../../../../common/src/util';
import type {ClientState} from '../../state/reducers/root';
import type {ClientStateCity} from '../../state/reducers/cities';
import type {ClientAction} from '../../actions';

type OwnProps = {};

type StateProps = {
    viewedCity: ?ClientStateCity
};

type DispatchProps = {};

type Props = {
    ...OwnProps,
    ...StateProps,
    ...DispatchProps
}

const Component = ({viewedCity}: Props) => {

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

    return (
        <div>
            <WorldMapComponent
                windowSize={{x: window.innerWidth, y: window.innerHeight}}
            />
            {viewedCity != null && <CityViewComponent city={viewedCity}/>}
        </div>
    );
};

const mapStateToProps = (state: ClientState): StateProps => {
    return {
        viewedCity: state.menu.viewedCityId == null ? null : state.cities.byId[state.menu.viewedCityId]
    };
};

const mapDispatchToProps = (dispatch: Dispatch<ClientAction>): DispatchProps => {
    return EMPTY_OBJECT;
};

export const AppComponent = connect<Props, OwnProps, StateProps, DispatchProps, ClientState, Dispatch<ClientAction>>(mapStateToProps, mapDispatchToProps)(Component);
