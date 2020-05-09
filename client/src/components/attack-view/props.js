// @flow

import {
    clientActions,
} from '../../pages/world/state/modules/actions';
import {
    clientStateSelectors,
} from '../../pages/world/state/modules/selectors';
import {
    connect,
} from 'react-redux';
import type {
    ActionCreatorsProps, StateToProps,
} from '../types';
import type {
    ClientAction, ClientState,
} from '../../pages/world/state/types';
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
            attackedCity: clientStateSelectors.attackedCity(
                state,
            ),
            attackedCityId: clientStateSelectors.menu.attackedCityId(
                state,
            ),
            attackingCityId: clientStateSelectors.menu.attackingCityId(
                state,
            ),
            isFormSubmitting: clientStateSelectors.menu.isAttackFormSubmitting(
                state,
            ),
            isFormValid: clientStateSelectors.menu.isAttackFormValid(
                state,
            ),
            minimumDelay: clientStateSelectors.menu.minimumAttackDelay(
                state,
            ),
            regimentTemplate: clientStateSelectors.menu.regimentTemplate(
                state,
            ),
        },
    );

};

const actionCreators: DispatchProps = Object.freeze(
    {
        closeAttackView     : clientActions.menu.closeAttackView,
        requestOrderCreation: clientActions.commonState.requestOrderCreation,
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
