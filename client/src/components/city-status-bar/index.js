// @flow

import React from 'react';
import type {Dispatch} from 'redux';
import {connect} from 'react-redux';
import type {ClientAction} from '../../state/actions';
import classNames from 'classnames';
import type {CommonStateCity} from '../../../../common/src/state';
import {calculateBuildingTierSum} from '../../../../common/src/state';
import type {ClientState, ClientStatePlayer} from '../../state/state';

type OwnProps = {
    city: CommonStateCity,
};

type StateProps = {
    player: ClientStatePlayer,
};

type DispatchProps = {};

type Props = {
    ...OwnProps,
    ...StateProps,
    ...DispatchProps,
};

const Component = ({city, player}: Props) => {

    if (player == null) {
        return (
            <div/>
        );
    }

    const tiersSum = calculateBuildingTierSum({buildings: city.buildings});

    const isAbandoned = city.ownerId === null;
    const doesBelongToPlayer = city.ownerId === player.name;
    const doesBelongToEnemy = !isAbandoned && !doesBelongToPlayer;

    const className = classNames(
        'absolute left-1/2 transform -translate-x-1/2 flex flex-row text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-center rounded-lg text-gray-100',
        {
            'bg-gray-500-alpha-50': isAbandoned,
            'bg-green-500-alpha-50': doesBelongToPlayer,
            'bg-red-500-alpha-50': doesBelongToEnemy,
        }
    );

    return (
        <div className={className}>
            <div
                className="p-1 font-bold border-r border-gray-900">{tiersSum}
            </div>
            <div className="p-1 font-normal">{city.name}
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

export const CityStatusBarComponent = connect<Props,
    OwnProps,
    StateProps,
    DispatchProps,
    ClientState,
    Dispatch<ClientAction>>(
    mapStateToProps,
    // $FlowFixMe
    actionCreators
)(Component);
