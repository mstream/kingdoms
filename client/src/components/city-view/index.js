/**
 * @flow
 */

import React from 'react';
import './style.css';
import type {ClientState, ClientStateCity} from '../../state/types';
import {EMPTY_OBJECT} from '../../../../common/src/util';
import {Dispatch} from 'redux';
import type {Action} from '../../types';
import {closeCityView} from '../../actions';
import {connect} from 'react-redux';

type OwnProps = {
    city: ClientStateCity
};

type StateProps = {};

type DispatchProps = {
    closeCityView: () => mixed
};

type Props = {
    ...OwnProps,
    ...StateProps,
    ...DispatchProps
}

const Component = ({city, closeCityView}: Props) => {
    return (
        <div
            className="CityView modal absolute w-full h-full top-0 left-0 flex items-center justify-center">
            <div
                onClick={() => closeCityView()}
                className="modal-overlay absolute w-full h-full bg-black opacity-75 top-0 left-0 cursor-pointer"/>
            <div
                className="absolute w-1/2 h-32 bg-white rounded-sm shadow-lg flex flex-col items-center justify-center text-2xl">
                <div className="font-bold text-xl mb-2">
                    <p className="text-center">{city.name}</p>
                </div>
                <p className="text-gray-700 text-base">
                    *** CITY INFO HERE ***
                </p>
            </div>
        </div>
    );
};

const mapStateToProps = (state: ClientState): StateProps => {
    return EMPTY_OBJECT;
};

const mapDispatchToProps = (dispatch: Dispatch<Action>): DispatchProps => {
    return {
        closeCityView: () => dispatch(closeCityView())
    };
};

export const CityViewComponent = connect<Props, OwnProps, StateProps, DispatchProps, ClientState, Dispatch<Action>>(mapStateToProps, mapDispatchToProps)(Component);
