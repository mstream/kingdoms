// @flow
import type {ClientState} from '../../state/state';
import type {ActionCreatorsProps, StateToProps} from '../types';
import {connect} from 'react-redux';
import type {Dispatch} from 'redux';
import type {ClientAction} from '../../state/actions';
import type { CommonStateCity } from '../../../../common/src/state';

type OwnProps = {
    city: CommonStateCity,
};

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
        player: state.player,
    });
};

const actionCreators: DispatchProps = Object.freeze({});

export const connectProps = connect<Props,
    OwnProps,
    StateProps,
    DispatchProps,
    ClientState,
    Dispatch<ClientAction>>(
    mapStateToProps,
    actionCreators
);
