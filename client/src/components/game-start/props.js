// @flow

import {
    clientActions,
} from '../../state/modules/actions';
import {
    clientStateSelectors,
} from '../../state/modules/selectors';
import {
    connect,
} from 'react-redux';
import type {
    ActionCreatorsProps, StateToProps,
} from '../types';
import type {
    ClientAction, ClientState,
} from '../../state/types';
import type {
    Dispatch,
} from 'redux';

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
