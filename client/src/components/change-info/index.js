/**
 * @flow
 */

import React from 'react';
import {EMPTY_OBJECT} from '../../../../common/src/util';
import type {Dispatch} from 'redux';
import {connect} from 'react-redux';
import type {ClientState} from '../../state/reducers/root';
import type {ClientAction} from '../../state/actions';
import {numberToQuantityString} from '../../util';
import type {ChangeInfo} from '../../../../common/src/state';
import classNames from 'classnames';

type OwnProps = {
    changeInfo: ChangeInfo,
};

type StateProps = {};

type DispatchProps = {};

type Props = {
    ...OwnProps,
    ...StateProps,
    ...DispatchProps,
};

const Component = ({changeInfo}: Props) => {
    const lineComponents = Object
        .keys(changeInfo)
        .sort((changeType1, changeType2) => {
            return changeInfo[changeType1] - changeInfo[changeType2];
        }).map(changeType => {
            const partialRate = changeInfo[changeType];
            const className = classNames({
                'text-red-500': partialRate < 0,
                'text-gray-900': partialRate === 0,
                'text-green-500': partialRate > 0
            });
            return (
                <p key={changeType}
                   className="text-xs text-center font-medium text-gray-900">{changeType}:
                    <i className={className}>{numberToQuantityString({value: partialRate})}/h</i>
                </p>
            );
        });
    return (
        <div className="flex flex-col m-1 rounded-sm bg-gray-100 shadow-2xs">{lineComponents}</div>
    );
};

const mapStateToProps = (state: ClientState): StateProps => {
    return EMPTY_OBJECT;
};

const actionCreators: DispatchProps = EMPTY_OBJECT;

export const ChangeInfoComponent = connect<Props,
    OwnProps,
    StateProps,
    DispatchProps,
    ClientState,
    Dispatch<ClientAction>>(
    mapStateToProps,
    // $FlowFixMe
    actionCreators
)(Component);
