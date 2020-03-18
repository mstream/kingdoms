// @flow

import type { ActionCreatorsProps, StateToProps } from '../types';
import { connect } from 'react-redux';
import type { Dispatch } from 'redux';
import type { ClientAction } from '../../state/actions';
import {
    isGameStartingSelector,
} from '../../state/selectors';
import { isCityBeingCreatedSelector } from '../../state/modules/menu/selectors';
import { requestCityCreation } from '../../state/modules/common-state/actions';
import type { ClientState } from '../../state/modules/types';

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
        isGameStarting: isGameStartingSelector(state),
        isCityBeingCreated: isCityBeingCreatedSelector(state),
    });
};

const actionCreators: DispatchProps = Object.freeze({
    requestCityCreation,
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