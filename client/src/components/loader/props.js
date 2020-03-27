// @flow


import type { ActionCreatorsProps, StateToProps } from '../types';
import type { Dispatch } from 'redux';
import { connect } from 'react-redux';
import type { ClientState } from '../../state/modules/types';
import type { ClientAction } from '../../state/types';
import { clientStateErrorsSelectors } from '../../state/modules/errors/selectors';
import { clientStateCommonStateSelectors } from '../../state/modules/common-state/selectors';

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
        isCommonStateBeingLoaded:
            !clientStateCommonStateSelectors.isLoaded(state) &&
            !clientStateErrorsSelectors.anyErrors(state),
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