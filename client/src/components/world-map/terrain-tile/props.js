// @flow

import {
    connect,
} from 'react-redux';
import type {
    ActionCreatorsProps, StateToProps,
} from '../../types';
import type {
    ClientAction, ClientState,
} from '../../../pages/world/state/types';
import type {
    ClientStateTile,
} from '../../../pages/world/state/modules/_children/tiles/reducer/types';
import type {
    Dispatch,
} from 'redux';

type OwnProps = {
    tile: ClientStateTile,
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

const mapStateToProps = () => {

    return Object.freeze(
        {
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
