// @flow

import {
    connect,
} from 'react-redux';
import type {
    ClientAction, ClientState,
} from '../../../../state/types';
import type {
    CommonStateRegimentTemplate,
} from '../../../../../../common/src/state/modules/_children/orders/reducer/types';
import type {
    Dispatch,
} from 'redux';

type OwnProps = $ReadOnly< {|
    regimentTemplate: CommonStateRegimentTemplate,
|} >;

type StateProps = $ReadOnly< {||} >;

type DispatchProps = $ReadOnly< {||} >;

export type Props = {|
    ...OwnProps,
    ...StateProps,
    ...DispatchProps,
|};

const mapStateToProps = (): StateProps => {

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

        // $FlowFixMe
        actionCreators,
    );
