// @flow

import React from 'react';
import type {Dispatch} from 'redux';
import type {ClientAction} from '../../state/actions';
import {connect} from 'react-redux';
import {signOut} from '../../state/store';
import type {ClientState, ClientStatePlayer} from '../../state/state';

type OwnProps = {};

type StateProps = {
    player: ClientStatePlayer,
};

type DispatchProps = {};

type Props = {
    ...OwnProps,
    ...StateProps,
    ...DispatchProps,
};

const Component = ({player}: Props) => {
    if (player == null) {
        return null;
    }
    return (
        <div
            className="wallpaper-bg relative flex flex-row items-stretch justify-start h-20 w-full z-10 shadow-lg bg-gray-500 text-gray-100">
            <div className="group cursor-pointer">
                <div className="h-full">
                    <i className="icofont icofont-ui-user"/>
                    {player.name}
                    <i className="icofont icofont-caret-down"/>
                </div>
                <div
                    className="wallpaper2-bg absolute invisible group-hover:visible bg-gray-500 text-gray-100">
                    <div className="cursor-pointer" onClick={
                        (event) => {
                            signOut();
                        }
                    }>
                        <i className="icofont icofont-ui-power"/>
                        Sign Out
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state: ClientState): StateProps => {
    return Object.freeze({
        player: state.player,
    });
};

const actionCreators: DispatchProps = Object.freeze({});

export const MenuComponent = connect<Props,
    OwnProps,
    StateProps,
    DispatchProps,
    ClientState,
    Dispatch<ClientAction>>(
    mapStateToProps,
    // $FlowFixMe
    actionCreators
)(Component);
