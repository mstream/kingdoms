// @flow


import type { ActionCreatorsProps, StateToProps } from '../types';
import { connect } from 'react-redux';
import type { Dispatch } from 'redux';
import { clientStateSelectors } from '../../state/modules/selectors';
import type { ClientAction, ClientState } from '../../state/types';
import { clientStateMenuSelectors } from '../../state/modules/_children/menu/selectors';
import { clientActions } from '../../state/modules/actions';

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
        attackedCity: clientStateSelectors.attackedCity(state),
        attackedCityId: clientStateMenuSelectors.attackedCityId(state),
        attackingCityId: clientStateMenuSelectors.attackingCityId(state),
        isFormValid: clientStateMenuSelectors.isAttackFormValid(state),
        minimumDelay: clientStateMenuSelectors.minimumAttackDelay(state),
        regimentTemplate: clientStateMenuSelectors.regimentTemplate(state),
    });
};

const actionCreators: DispatchProps = Object.freeze({
    closeAttackView: clientActions.menu.closeAttackView,
    requestOrderCreation: clientActions.commonState.requestOrderCreation,
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