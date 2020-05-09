// @flow

import {
    clientActions,
} from '../../../pages/world/state/modules/actions';
import {
    clientStateSelectors,
} from '../../../pages/world/state/modules/selectors';
import {
    connect,
} from 'react-redux';
import type {
    ActionCreatorsProps, StateToProps,
} from '../../types';
import type {
    ClientAction, ClientState,
} from '../../../pages/world/state/types';
import type {
    Dispatch,
} from 'redux';

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

    return {
        isVisible:
            clientStateSelectors.menu.isAttackViewMenuOpen(
                state,
            )
            && clientStateSelectors.menu.attackingCityId != null,
        minimumDelay: clientStateSelectors.menu.minimumAttackDelay(
            state,
        ),
    };

};

const actionCreators: DispatchProps = Object.freeze(
    {
        updateAttackViewMinimumDelay:
    clientActions.menu.updateAttackViewMinimumDelay,
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
