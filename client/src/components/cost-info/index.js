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
import type {CommonStateResources} from '../../../../common/src/state';
import classNames from 'classnames';
import {subtractQuantities} from '../../../../common/src/quantity';
import {convertQuantitiesToResources} from '../../../../common/src/resource';
import type {EmptyObject} from '../../../../common/src/util';

type OwnProps = {|
    availableResources: CommonStateResources,
    requiredResources: CommonStateResources,
|};

type StateProps = EmptyObject;

type DispatchProps = EmptyObject;

type Props = {
    ...OwnProps,
    ...StateProps,
    ...DispatchProps,
};

const Component = ({availableResources, requiredResources}: Props) => {
    const availableResourcesAfter = convertQuantitiesToResources({
        quantities: subtractQuantities({
            quantities1: availableResources,
            quantities2: requiredResources,
        })
    });

    const requiredResourceComponents = Object
        .keys(requiredResources)
        .map(resourceType => {
            const requiredResource = requiredResources[resourceType];
            const availableResourceAfter = availableResourcesAfter[resourceType];

            const className = classNames({
                'text-red-500': availableResourceAfter < 0,
                'text-green-500': availableResourceAfter >= 0,
            });

            return (
                <p key={resourceType}
                   className="text-xs text-center font-medium text-gray-900">{resourceType}:
                    <i className={className}>{numberToQuantityString({value: requiredResource})}</i>
                </p>
            );
        });
    return (
        <div
            className="flex flex-col m-1 rounded-sm bg-gray-100 shadow-2xs">{requiredResourceComponents}
        </div>
    );
};

const mapStateToProps = (state: ClientState): StateProps => {
    return EMPTY_OBJECT;
};

const actionCreators: DispatchProps = EMPTY_OBJECT;

export const CostInfoComponent = connect<Props,
    OwnProps,
    StateProps,
    DispatchProps,
    ClientState,
    Dispatch<ClientAction>>(
    mapStateToProps,
    // $FlowFixMe
    actionCreators
)(Component);
