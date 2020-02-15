/**
 * @flow
 */

import React, {useEffect, useState} from 'react';
import './style.css';
import {WorldMapComponent} from '../world-map';
import {connect} from 'react-redux';
import type {ClientState, ClientStateCity} from '../../state/types';
import type {Dispatch} from 'redux';
import type {Action} from '../../types';
import {CityViewComponent} from '../city-view';
import type {Vector} from '../../../../common/src/types';
import {EMPTY_OBJECT} from '../../../../common/src/util';

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
        viewedCity: state.menu.viewedCityId == null ? null : state.citiesById[state.menu.viewedCityId]
    };
};

const mapDispatchToProps = (dispatch: Dispatch<Action>): DispatchProps => {
    return EMPTY_OBJECT;
};

export const AppComponent = connect<Props, OwnProps, StateProps, DispatchProps, ClientState, Dispatch<Action>>(mapStateToProps, mapDispatchToProps)(Component);
