// @flow

import type {Node} from 'react';
import React from 'react';
import type {Dispatch} from 'redux';
import {connect} from 'react-redux';
import type {ClientAction} from '../../state/actions';
import type {ClientState} from '../../state/state';

type OwnProps = {
    children: Node,
};

type StateProps = {};

type DispatchProps = {};

type Props = {
    ...OwnProps,
    ...StateProps,
    ...DispatchProps,
};

const Component = ({children}: Props) => {
    return (
        <div
            className="flex flex-row flex-wrap flex-none items-stretch content-center justify-center w-full p-1 shadow-inner">
            {children}
        </div>
    );
};

const mapStateToProps = (state: ClientState): StateProps => {
    return Object.freeze({});
};

const actionCreators: DispatchProps = Object.freeze({});

export const CityItemsListComponent = connect<Props,
    OwnProps,
    StateProps,
    DispatchProps,
    ClientState,
    Dispatch<ClientAction>>(
    mapStateToProps,
    // $FlowFixMe
    actionCreators
)(Component);
