// @flow

import type { ActionCreatorsProps, StateToProps } from '../types';
import { connect } from 'react-redux';
import type { Dispatch } from 'redux';
import type { ClientAction } from '../../state/actions';
import {
    citiesSelector,
    cityDistancesSelector,
    cityIdsOwnedByPlayerSelector,
} from '../../state/selectors';
import type { ClientState } from '../../state/modules/root';
import {
    attackedCityIdSelector,
    attackingCityIdSelector,
} from '../../state/modules/menu/selectors';
import {
    closeAttackView,
    selectAttackViewAttackingCity,
} from '../../state/modules/menu/actions';

type OwnProps = {};

type StateProps = $ReadOnly<{
    ...StateToProps<typeof mapStateToProps>,
}>

type DispatchProps = $ReadOnly<{
    ...ActionCreatorsProps<typeof actionCreators>,
}>;

export type Props = {
    ...OwnProps,
    ...StateProps,
    ...DispatchProps,
};

const mapStateToProps = (state: ClientState) => {
    return Object.freeze({
        attackedCityId: attackedCityIdSelector(state),
        attackingCityId: attackingCityIdSelector(state),
        cities: citiesSelector(state),
        cityDistances: cityDistancesSelector(state),
        cityIdsOwnedByPlayer: cityIdsOwnedByPlayerSelector(state),
    });
};

const actionCreators: DispatchProps = Object.freeze({
    closeAttackView,
    selectAttackViewAttackingCityAction: selectAttackViewAttackingCity,
});

export const connectProps = connect<Props,
    OwnProps,
    StateProps,
    DispatchProps,
    ClientState,
    Dispatch<ClientAction>>(
    mapStateToProps,
    actionCreators,
);