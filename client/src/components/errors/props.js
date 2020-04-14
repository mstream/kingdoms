// @flow

import type {
    ActionCreatorsProps, StateToProps,
} from '../types';
import type {
    Dispatch,
} from 'redux';
import {
    connect,
} from 'react-redux';
import type {
    ClientAction, ClientState,
} from '../../state/types';
import {
    clientStateSelectors,
} from '../../state/modules/selectors';

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
            errors: clientStateSelectors.errors.errors(
                state,
            ),
        },
    );

};

const actionCreators: DispatchProps = Object.freeze(
    {
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
