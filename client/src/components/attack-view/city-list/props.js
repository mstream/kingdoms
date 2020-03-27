// @flow


import { connect } from 'react-redux';
import type { Dispatch } from 'redux';
import { selectAttackViewAttackingCity } from '../../../state/modules/menu/actions';
import type { ActionCreatorsProps, StateToProps } from '../../types';
import type { ClientState } from '../../../state/modules/types';
import type { ClientAction } from '../../../state/types';
import { clientStateMenuSelectors } from '../../../state/modules/menu/selectors';
import { clientStateCommonStateSelectors } from '../../../state/modules/common-state/selectors';
import { clientStateSelectors } from '../../../state/modules/selectors';

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
        attackingCityId: clientStateMenuSelectors.attackingCityId(state),
        cities: clientStateCommonStateSelectors.cities(state),
        cityIdsOwnedByPlayer: clientStateSelectors.cityIdsOwnedByPlayer(state),
        distancesToAttackedCity: clientStateSelectors.distancesToAttackedCity(state),
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