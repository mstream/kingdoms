/**
 * @flow
 */

import React from 'react';
import {EMPTY_OBJECT} from '../../../../common/src/util';
import type {Dispatch} from 'redux';
import {connect} from 'react-redux';
import foodImage from '../../assets/images/resources/food.png';
import woodImage from '../../assets/images/resources/wood.png';
import type {ClientState} from '../../state/reducers/root';
import type {ClientAction} from '../../state/actions';
import {ImageComponent} from '../image';
import {numberToQuantityString} from '../../util';
import {CityItemsListComponent} from '../city-items-list';
import type {CommonStateResources} from '../../../../common/src/state';

const resourceVisuals = {
    food: {
        name: 'Food',
        image: foodImage
    },
    wood: {
        name: 'Wood',
        image: woodImage
    },
};

type OwnProps = {
    resources: CommonStateResources,
};

type StateProps = {};

type DispatchProps = {};

type Props = {
    ...OwnProps,
    ...StateProps,
    ...DispatchProps,
};

const Component = ({resources}: Props) => {
    const resourceComponents = Object.keys(resources).map(resourceType => {
        const resource = resources[resourceType];
        const resourceVisual = resourceVisuals[resourceType];
        return (
            <div
                key={resourceType}
                className="flex flex-col w-4 sm:w-6 md:w-8 lg:w-10 xl:w-12 m-1 rounded-sm bg-gray-100 shadow-2xs">
                <p className="text-xs text-center font-medium text-gray-900">{numberToQuantityString({value: resource.quantity})}</p>
                <ImageComponent image={resourceVisual.image} ratio="100%"/>
                <p className="text-xs text-center text-gray-900">{resourceVisual.name}</p>
            </div>
        );
    });
    return (
        <CityItemsListComponent>{resourceComponents}</CityItemsListComponent>
    );
};

const mapStateToProps = (state: ClientState): StateProps => {
    return EMPTY_OBJECT;
};

const mapDispatchToProps = (
    dispatch: Dispatch<ClientAction>
): DispatchProps => {
    return EMPTY_OBJECT;
};

export const ResourcesComponent = connect<Props,
    OwnProps,
    StateProps,
    DispatchProps,
    ClientState,
    Dispatch<ClientAction>>(
    mapStateToProps,
    mapDispatchToProps
)(Component);
