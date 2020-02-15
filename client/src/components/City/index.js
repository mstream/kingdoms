/**
 * @flow
 */

import React from 'react';
import './style.css';
import {createGeometryStyle} from '../../util';
import type {ClientState, ClientStateCity} from '../../state/types';
import {Dispatch} from 'redux';
import type {Action} from '../../types';
import {EMPTY_OBJECT} from '../../../../common/src/util';
import {connect} from 'react-redux';
import {openCityView} from '../../actions';

type OwnProps = {};

type StateProps = {
    city: ClientStateCity
};

type DispatchProps = {
    openCityView: ({ cityId: string }) => mixed
};

type Props = {
    ...OwnProps,
    ...StateProps,
    ...DispatchProps
}

const Component = ({city, openCityView}: Props) => {

    const style = {
        ...createGeometryStyle({geometry: city.geometry}),
    };

    return (
        <div className="City"
             style={style}
             onClick={() => openCityView({cityId: city.id})}
        >
            {city.name}
        </div>
    );
};

const mapStateToProps = (state: ClientState): StateProps => {
    return EMPTY_OBJECT;
};

const mapDispatchToProps = (dispatch: Dispatch<Action>): DispatchProps => {
    return {
        openCityView: ({cityId}: { cityId: string }) => dispatch(openCityView({cityId}))
    };
};

export const CityComponent = connect<Props, OwnProps, StateProps, DispatchProps, ClientState, Dispatch<Action>>(mapStateToProps, mapDispatchToProps)(Component);
