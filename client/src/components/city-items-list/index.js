/**
 * @flow
 */

import type {Node} from 'react';
import React from 'react';
import {EMPTY_OBJECT} from '../../../../common/src/util';
import type {Dispatch} from 'redux';
import {connect} from 'react-redux';
import type {ClientState} from '../../state/reducers/root';
import type {ClientAction} from '../../state/actions';
import type {EmptyObject} from '../../../../common/src/util';

type OwnProps = {
    children: Node,
};

type StateProps = EmptyObject;

type DispatchProps = EmptyObject;

type Props = {
    ...OwnProps,
    ...StateProps,
    ...DispatchProps,
};

const Component = ({children}: Props) => {
    return (
        <div
            className="flex flex-row flex-wrap flex-none items-stretch content-center justify-center w-full p-1 shadow-inner bg-gray-500">
            {children}
        </div>
    );
};

const mapStateToProps = (state: ClientState): StateProps => {
    return EMPTY_OBJECT;
};

const actionCreators: DispatchProps = EMPTY_OBJECT;

export const CityItemsListComponent = connect<Props,
    OwnProps,
    StateProps,
    DispatchProps,
    ClientState,
    Dispatch<ClientAction>>(
    mapStateToProps,
    // $FlowFixMe
    actionCreators
)(Component);
