// @flow


import type { ActionCreatorsProps, StateToProps } from '../types';
import { connect } from 'react-redux';
import type { Dispatch } from 'redux';
import { requestCityCreation } from '../../state/modules/common-state/actions';
import type { ClientState } from '../../state/modules/types';
import type { ClientAction } from '../../state/types';
import { clientStateMenuSelectors } from '../../state/modules/menu/selectors';
import { clientStateSelectors } from '../../state/modules/selectors';

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
        isGameStarting: clientStateSelectors.isGameStarting(state),
        isCityBeingCreated: clientStateMenuSelectors.isNewCityBeingCreated(state),
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