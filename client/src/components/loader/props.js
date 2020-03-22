// @flow


import type { ActionCreatorsProps, StateToProps } from '../types';
import type { Dispatch } from 'redux';
import { commonStateSelector } from '../../state/modules/common-state/selectors';
import { connect } from 'react-redux';
import type { ClientState } from '../../state/modules/types';
import { anyErrorsSelector } from '../../state/selectors';
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
        isCommonStateBeingLoaded: commonStateSelector(state) == null && !anyErrorsSelector(state),
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