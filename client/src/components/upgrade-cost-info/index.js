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
import type {
    CommonStateResources,
    UpgradeCostInfo
} from '../../../../common/src/state';
import classNames from 'classnames';

type OwnProps = {
    resources: CommonStateResources,
    upgradeCostInfo: UpgradeCostInfo,
};

type StateProps = {};

type DispatchProps = {};

type Props = {
    ...OwnProps,
    ...StateProps,
    ...DispatchProps,
};

const Component = ({resources, upgradeCostInfo}: Props) => {
    const lineComponents = Object
        .keys(upgradeCostInfo)
        .filter(resourceType => upgradeCostInfo[resourceType] != null)
        .map(resourceType => {
            const requiredResourceQuantity = upgradeCostInfo[resourceType];
            if (requiredResourceQuantity == null) {
                throw Error();
            }
            const availableResourceQuantity = resources[resourceType].quantity;
            const className = classNames({
                'text-red-500': requiredResourceQuantity > availableResourceQuantity,
                'text-green-500': requiredResourceQuantity <= availableResourceQuantity,
            });
            return (
                <p key={resourceType}
                   className="text-xs text-center font-medium text-gray-900">{resourceType}:
                    <i className={className}>{numberToQuantityString({value: requiredResourceQuantity})}</i>
                </p>
            );
        });
    return (
        <div
            className="flex flex-col m-1 rounded-sm bg-gray-100 shadow-2xs">{lineComponents}</div>
    );
};

const mapStateToProps = (state: ClientState): StateProps => {
    return EMPTY_OBJECT;
};

const actionCreators: DispatchProps = EMPTY_OBJECT;

export const UpgradeCostInfoComponent = connect<Props,
    OwnProps,
    StateProps,
    DispatchProps,
    ClientState,
    Dispatch<ClientAction>>(
    mapStateToProps,
    // $FlowFixMe
    actionCreators
)(Component);
