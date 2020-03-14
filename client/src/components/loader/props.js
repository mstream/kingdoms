// @flow
import type { ActionCreatorsProps, StateToProps } from '../types';
import type { Dispatch } from 'redux';
import type { ClientAction } from '../../state/actions';
import type { ClientState } from '../../state/modules/root';
import { commonStateSelector } from '../../state/modules/common-state/selectors';
import { connect } from 'react-redux';

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
        isCommonStateBeingLoaded: commonStateSelector(state) == null,
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
    actionCreators,
);