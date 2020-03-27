// @flow


import { connect } from 'react-redux';
import type { Dispatch } from 'redux';
import type { ActionCreatorsProps, StateToProps } from '../../types';
import type { ClientState } from '../../../state/modules/types';
import type { ClientAction } from '../../../state/types';
import { updateAttackViewMinimumDelay } from '../../../state/modules/menu/actions';
import { clientStateMenuSelectors } from '../../../state/modules/menu/selectors';

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
    return {
        isVisible: clientStateMenuSelectors.isAttackViewMenuOpen(state)
            && clientStateMenuSelectors.attackingCityId != null,
        minimumDelay: clientStateMenuSelectors.minimumAttackDelay(state),
    };
};

const actionCreators: DispatchProps = Object.freeze({
    updateAttackViewMinimumDelay,
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