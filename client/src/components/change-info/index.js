/**
 * @flow
 */

import React from 'react';
import type {Dispatch} from 'redux';
import {connect} from 'react-redux';
import type {ClientState} from '../../state/reducers/root';
import type {ClientAction} from '../../state/actions';
import {numberToQuantityString} from '../../util';
import classNames from 'classnames';
import type {Quantities} from '../../../../common/src/quantity';

type OwnProps = {
    changeInfo: Quantities,
};

type StateProps = {};

type DispatchProps = {};

type Props = {
    ...OwnProps,
    ...StateProps,
    ...DispatchProps,
};

const Component = ({changeInfo}: Props) => {
    const changeComponents = Object
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
        <div className="flex flex-col m-1 rounded-sm bg-gray-100 shadow-2xs">{changeComponents}</div>
    );
};

const mapStateToProps = (state: ClientState): StateProps => {
    return Object.freeze({});;
};

const actionCreators: DispatchProps = Object.freeze({});;

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
