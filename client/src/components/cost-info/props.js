// @flow

import {
    connect,
} from 'react-redux';
import type {
    ActionCreatorsProps, StateToProps,
} from '../types';
import type {
    ClientAction, ClientState,
} from '../../pages/world/state/types';
import type {
    CommonStateResources,
} from '../../../../common/src/state/modules/_children/rules/reducer/types';
import type {
    Dispatch,
} from 'redux';

type OwnProps = {
    availableResources: CommonStateResources,
    requiredResources: CommonStateResources,
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
