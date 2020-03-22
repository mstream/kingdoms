// @flow


import { connect } from 'react-redux';
import type { Dispatch } from 'redux';
import { selectAttackViewAttackingCity } from '../../../state/modules/menu/actions';
import { attackingCityIdSelector } from '../../../state/modules/menu/selectors';
import {
    citiesSelector,
    cityIdsOwnedByPlayerSelector,
    distancesToAttackedCitySelector,
} from '../../../state/selectors';
import type { ActionCreatorsProps, StateToProps } from '../../types';
import type { ClientState } from '../../../state/modules/types';
import type { ClientAction } from '../../../state/types';

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
        attackingCityId: attackingCityIdSelector(state),
        cities: citiesSelector(state),
        cityIdsOwnedByPlayer: cityIdsOwnedByPlayerSelector(state),
        distancesToAttackedCity: distancesToAttackedCitySelector(state),
    });
};

const actionCreators: DispatchProps = Object.freeze({
    selectAttackViewAttackingCity,
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