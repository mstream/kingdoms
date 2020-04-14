// @flow

import type {
    ActionCreatorsProps, StateToProps,
} from '../types';
import {
    connect,
} from 'react-redux';
import type {
    Dispatch,
} from 'redux';
import type {
    ClientAction, ClientState,
} from '../../state/types';
import {
    clientStateSelectors,
} from '../../state/modules/selectors';
import {
    clientActions,
} from '../../state/modules/actions';

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
            isCityBeingCreated: clientStateSelectors.menu.isNewCityBeingCreated(
                state,
            ),
            isGameStarting: clientStateSelectors.isGameStarting(
                state,
            ),
        },
    );

};

const actionCreators: DispatchProps = Object.freeze(
    {
        requestCityCreation: clientActions.commonState.requestCityCreation,
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
