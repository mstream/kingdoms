// @flow

import React from 'react';
import type {Dispatch} from 'redux';
import {connect} from 'react-redux';
import type {ClientAction} from '../../state/actions';
import type {CommonStateCity} from '../../../../common/src/state';
import type {ClientState, ClientStatePlayer} from '../../state/state';

type OwnProps = {
    city: CommonStateCity,
};

type StateProps = {};

type DispatchProps = {};

type Props = {
    ...OwnProps,
    ...StateProps,
    ...DispatchProps,
};

const Component = ({city}: Props) => {

    if (city.ownerId == null) {
        return null;
    }

    return (
        <div
            className="absolute left-1/2 transform -translate-y-full -translate-x-1/2 p-1 flex flex-row font-light text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-center rounded-lg text-gray-100 bg-gray-500-alpha-50">
            {city.ownerId}
        </div>
    );
};

const mapStateToProps = (state: ClientState): StateProps => {
    return Object.freeze({});
};

const actionCreators: DispatchProps = Object.freeze({});

export const CityOwnerBarComponent = connect<Props,
    OwnProps,
    StateProps,
    DispatchProps,
    ClientState,
    Dispatch<ClientAction>>(
    mapStateToProps,
    // $FlowFixMe
    actionCreators
)(Component);
