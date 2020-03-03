// @flow

import React from 'react';
import type {Dispatch} from 'redux';
import type {ClientAction} from '../../state/actions';
import {connect} from 'react-redux';
import type {ClientState} from '../../state/state';

type OwnProps = {};

type StateProps = {};

type DispatchProps = {};

type Props = {
    ...OwnProps,
    ...StateProps,
    ...DispatchProps,
};

const Component = () => {
    return (
        <div className="flex flex-row content-center h-screen w-screen">
            <div
                className="loader h-20 w-20 my-auto mx-auto grid grid-cols-3 text-gray-100">
                <div/>
                <div/>
                <div/>
                <div/>
                <div/>
                <div/>
                <div/>
                <div/>
                <div/>
            </div>
        </div>
    );
};

const mapStateToProps = (state: ClientState): StateProps => {
    return Object.freeze({});
};

const actionCreators: DispatchProps = Object.freeze({});

export const LoaderComponent = connect<Props,
    OwnProps,
    StateProps,
    DispatchProps,
    ClientState,
    Dispatch<ClientAction>>(
    mapStateToProps,
    // $FlowFixMe
    actionCreators
)(Component);
