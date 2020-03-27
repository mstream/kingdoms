// @flow


import type { ActionCreatorsProps, StateToProps } from '../types';
import { connect } from 'react-redux';
import type { Dispatch } from 'redux';
import { clientStateSelectors } from '../../state/modules/selectors';
import {
    closeAttackView,
    requestOrderCreation,
} from '../../state/modules/menu/actions';
import type { ClientState } from '../../state/modules/types';
import type { ClientAction } from '../../state/types';
import { clientStateMenuSelectors } from '../../state/modules/menu/selectors';

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
    closeAttackView,
    requestOrderCreation,
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