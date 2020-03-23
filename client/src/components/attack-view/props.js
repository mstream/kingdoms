// @flow


import type { ActionCreatorsProps, StateToProps } from '../types';
import { connect } from 'react-redux';
import type { Dispatch } from 'redux';
import { attackedCitySelector } from '../../state/selectors';
import {
    attackedCityIdSelector,
    attackingCityIdSelector, minimumDelaySelector,
    minimumRegimentSizeSelector, regimentTemplateSelector,
} from '../../state/modules/menu/selectors';
import {
    closeAttackView,
    requestOrderCreation,
} from '../../state/modules/menu/actions';
import type { ClientState } from '../../state/modules/types';
import type { ClientAction } from '../../state/types';

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
        attackedCity: attackedCitySelector(state),
        attackedCityId: attackedCityIdSelector(state),
        attackingCityId: attackingCityIdSelector(state),
        isFormValid: attackingCityIdSelector(state) != null && minimumRegimentSizeSelector(state) > 0,
        minimumDelay: minimumDelaySelector(state),
        regimentTemplate: regimentTemplateSelector(state),
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