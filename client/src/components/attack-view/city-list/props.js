// @flow

import {
    clientActions,
} from '../../../state/modules/actions';
import {
    clientStateSelectors,
} from '../../../state/modules/selectors';
import {
    connect,
} from 'react-redux';
import type {
    ActionCreatorsProps, StateToProps,
} from '../../types';
import type {
    ClientAction, ClientState,
} from '../../../state/types';
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

    return Object.freeze(
        {
            attackingCityId: clientStateSelectors.menu.attackingCityId(
                state,
            ),
            cities: clientStateSelectors.commonState.cities(
                state,
            ),
            cityIdsOwnedByPlayer: clientStateSelectors.cityIdsOwnedByPlayer(
                state,
            ),
            distancesToAttackedCity: clientStateSelectors.distancesToAttackedCity(
                state,
            ),
        },
    );

};

const actionCreators: DispatchProps = Object.freeze(
    {
        selectAttackViewAttackingCity:
    clientActions.menu.selectAttackViewAttackingCity,
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
