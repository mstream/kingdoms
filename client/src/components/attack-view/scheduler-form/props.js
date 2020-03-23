// @flow


import { connect } from 'react-redux';
import type { Dispatch } from 'redux';
import type { ActionCreatorsProps, StateToProps } from '../../types';
import type { ClientState } from '../../../state/modules/types';
import {
    attackingCityIdSelector,
    minimumDelaySelector,
} from '../../../state/modules/menu/selectors';
import type { ClientAction } from '../../../state/types';
import { updateAttackViewMinimumDelay } from '../../../state/modules/menu/actions';

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
        isVisible: attackingCityIdSelector(state) != null,
        minimumDelay: minimumDelaySelector(state),
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