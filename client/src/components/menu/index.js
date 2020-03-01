/**
 * @flow
 */

import React from 'react';
import type {ClientState} from '../../state/reducers/root';
import type {Dispatch} from 'redux';
import type {ClientAction} from '../../state/actions';
import {connect} from 'react-redux';
import type {ClientStatePlayer} from '../../state/reducers/player';

type OwnProps = {};

type StateProps = {
    player: ?ClientStatePlayer,
};

type DispatchProps = {};

type Props = {
    ...OwnProps,
    ...StateProps,
    ...DispatchProps,
};

const Component = ({player}: Props) => {
    if (player == null) {
        return (
            <div/>
        );
    }
    return (
        <div
            className="wallpaper-bg relative h-20 h-full w-full z-10 shadow-lg bg-gray-500 text-gray-100">
            <div>
                <i className="icofont icofont-ui-user"/>
                {player.name}
            </div>
        </div>
    );
};

const mapStateToProps = (state: ClientState): StateProps => {
    return Object.freeze({
        player: state != null ? state.player : null,
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
