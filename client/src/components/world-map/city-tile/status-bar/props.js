// @flow
import {
    connect,
} from 'react-redux';
import type {
    ActionCreatorsProps, StateToProps,
} from '../../../types';
import type {
    ClientAction, ClientState,
} from '../../../../state/types';
import type {
    CommonStateCity,
} from '../../../../../../common/src/state/modules/_children/cities/reducer/types';
import type {
    Dispatch,
} from 'redux';

type OwnProps = {
    city: CommonStateCity,
};

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
            player: state.player,
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
