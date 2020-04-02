// @flow

import type { ActionCreatorsProps, StateToProps } from '../types';
import { connect } from 'react-redux';
import type { Dispatch } from 'redux';
import type { Quantities } from '../../../../common/src/quantity';
import type { ClientAction, ClientState } from '../../state/types';

type OwnProps = {
    changeInfo: Quantities,
};

type StateProps = $ReadOnly<{
    ...StateToProps<typeof mapStateToProps>,
}>;

type DispatchProps = $ReadOnly<{
    ...ActionCreatorsProps<typeof actionCreators>,
}>;

export type Props = {
    ...OwnProps,
    ...StateProps,
    ...DispatchProps,
};

const mapStateToProps = (state: ClientState) => {
    return Object.freeze({});
};

const actionCreators: DispatchProps = Object.freeze({});

export const connectProps = connect<
    Props,
    OwnProps,
    StateProps,
    DispatchProps,
    ClientState,
    Dispatch<ClientAction>,
>(mapStateToProps, actionCreators);
