/**
 * @flow
 */

import React from 'react';
import type {Dispatch} from 'redux';
import {connect} from 'react-redux';
import foodImage from '../../assets/images/resources/food.png';
import woodImage from '../../assets/images/resources/wood.png';
import type {ClientState} from '../../state/reducers/root';
import type {ClientAction} from '../../state/actions';
import {ImageComponent} from '../image';
import {numberToQuantityString} from '../../util';
import {CityItemsListComponent} from '../city-items-list';
import type {
    CommonStateCity,
    CommonStateRules
} from '../../../../common/src/state';
import {calculateResourceChangeInfo} from '../../../../common/src/state';
import {ChangeInfoComponent} from '../change-info';

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
    city: CommonStateCity,
};

type StateProps = {
    rules: ?CommonStateRules,
};

type DispatchProps = {};

type Props = {
    ...OwnProps,
    ...StateProps,
    ...DispatchProps,
};

const Component = ({city, rules}: Props) => {
    if (rules == null) {
        return (<div/>)
    }
    const resourceComponents = Object.keys(city.resources).map(resourceType => {
        const resource = city.resources[resourceType];
        const resourceVisual = resourceVisuals[resourceType];
        const changeInfo = calculateResourceChangeInfo({
            city,
            resourceType,
            rules,
        });
        return (
            <div
                key={resourceType}
                className="relative group opacity-90 hover:opacity-100 flex flex-col w-4 sm:w-6 md:w-8 lg:w-10 xl:w-12 m-1 rounded-sm rounded-t-lg rounded-b-lg bg-gray-100 shadow-2xs bg-gray-800">
                <p className="text-sm text-center font-medium text-gray-100">{numberToQuantityString({value: resource})}</p>
                <div
                    className="absolute top-full left-full invisible group-hover:visible w-16 sm:w-24 md:w-32 lg:w-40 xl:w-48 z-10 opacity-75 cursor-default pointer-events-none">
                    <ChangeInfoComponent changeInfo={changeInfo}/>
                </div>
                <ImageComponent image={resourceVisual.image} ratio="100%"/>
                <p className="text-xs text-center text-gray-100">{resourceVisual.name}</p>
            </div>
        );
    });
    return (
        <CityItemsListComponent>{resourceComponents}</CityItemsListComponent>
    );
};

const mapStateToProps = (state: ClientState): StateProps => {
    return {
        rules: state == null ? null : (state.serverState == null ? null : state.serverState.rules),
    };
};

const actionCreators: DispatchProps = Object.freeze({});;

export const ResourcesComponent = connect<Props,
    OwnProps,
    StateProps,
    DispatchProps,
    ClientState,
    Dispatch<ClientAction>>(
    mapStateToProps,
    // $FlowFixMe
    actionCreators
)(Component);
