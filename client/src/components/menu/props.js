// @flow

import type {
    ActionCreatorsProps, StateToProps,
} from '../types';
import {
    connect,
} from 'react-redux';
import type {
    Dispatch,
} from 'redux';
import type {
    ClientAction, ClientState,
} from '../../state/types';
import {
    clientStateSelectors,
} from '../../state/modules/selectors';
import {
    clientActions,
} from '../../state/modules/actions';

type OwnProps = {};

type StateProps = $ReadOnly< {
    ...StateToProps< typeof mapStateToProps >,
} >;

type DispatchProps = $ReadOnly< {
    ...ActionCreatorsProps< typeof actionCreators >,
} >;

export type Props = {
    ...OwnProps,
    ...StateProps,
    ...DispatchProps,
};

const mapStateToProps = (
    state: ClientState,
) => {

    return Object.freeze(
        {
            playerName: clientStateSelectors.player.name(
                state,
            ),
        },
    );

};

const actionCreators: DispatchProps = Object.freeze(
    {
        signOut: clientActions.global.signOut,
    },
);

export const connectProps = connect<Props,
    OwnProps,
    StateProps,
    DispatchProps,
    ClientState,
    Dispatch< ClientAction >,
    >(
        mapStateToProps,
        actionCreators,
    );
