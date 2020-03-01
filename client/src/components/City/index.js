// @flow

import React from 'react';
import {createGeometryStyle} from '../../util';
import type {Dispatch} from 'redux';
import {connect} from 'react-redux';
import type {ClientAction} from '../../state/actions';
import {openCityView} from '../../state/actions';
import type {ClientState} from '../../state/reducers/root';
import type {ClientStateCity} from '../../state/reducers/cities';
import cityImage from '../../assets/images/cities/city.png';
import {ImageComponent} from '../image';
import {CityStatusBarComponent} from '../city-status-bar';

type OwnProps = {
    city: { id: string, ... } & ClientStateCity,
};

type StateProps = {};

type DispatchProps = {
    openCityView: ({ cityId: string }) => mixed,
};

type Props = {
    ...OwnProps,
    ...StateProps,
    ...DispatchProps,
};

const Component = ({city, openCityView}: Props) => {
    const style = {
        ...createGeometryStyle({geometry: city.geometry}),
    };

    return (
        <div
            className="absolute cursor-pointer"
            style={style}
            onClick={() => openCityView({cityId: city.id})}
        >
            <ImageComponent image={cityImage} ratio="100%"/>
            <CityStatusBarComponent city={city}/>
        </div>
    );
};

const mapStateToProps = (state: ClientState): StateProps => {
    return Object.freeze({});
};

const actionCreators: DispatchProps = {
    openCityView
};

export const CityComponent = connect<Props,
    OwnProps,
    StateProps,
    DispatchProps,
    ClientState,
    Dispatch<ClientAction>>(
    mapStateToProps,
    // $FlowFixMe
    actionCreators
)(Component);
