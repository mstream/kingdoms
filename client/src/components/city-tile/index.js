// @flow

import React from 'react';
import {createGeometryStyle} from '../../util';
import type {Dispatch} from 'redux';
import {connect} from 'react-redux';
import type {ClientAction,} from '../../state/actions';
import {openCityView} from '../../state/actions';
import cityImage from '../../assets/images/cities/city.png';
import {ImageComponent} from '../image';
import {CityStatusBarComponent} from '../city-status-bar';
import type {ClientState, ClientStateTile} from '../../state/state';
import type {CommonStateCity} from '../../../../common/src/state';
import {CityOwnerBarComponent} from '../city-owner-bar';

type OwnProps = {
    city: CommonStateCity,
    cityTile: ClientStateTile,
    cityId: string,
};

type StateProps = {};

type DispatchProps = {
    openCityView: typeof openCityView,
};

type Props = {
    ...OwnProps,
    ...StateProps,
    ...DispatchProps,
};

const Component = ({city, cityId, cityTile, openCityView}: Props) => {
    const style = {
        ...createGeometryStyle({geometry: cityTile.geometry}),
    };

    return (
        <div
            className="absolute cursor-pointer"
            style={style}
            onClick={() => openCityView({cityId})}
        >
            <CityOwnerBarComponent city={city}/>
            <ImageComponent image={cityImage} ratio="100%"/>
            <CityStatusBarComponent city={city}/>
        </div>
    );
};

const mapStateToProps = (state: ClientState): StateProps => {
    return Object.freeze({});
};

const actionCreators: DispatchProps = {
    openCityView,
};

export const CityTileComponent = connect<Props,
    OwnProps,
    StateProps,
    DispatchProps,
    ClientState,
    Dispatch<ClientAction>>(
    mapStateToProps,
    // $FlowFixMe
    actionCreators
)(Component);
