// @flow

import React from 'react';
import type {Dispatch} from 'redux';
import {connect} from 'react-redux';
import peasantImage from '../../assets/images/units/peasant.png';
import type {ClientAction} from '../../state/actions';
import {CityItemsListComponent} from '../city-items-list';
import {ImageComponent} from '../image';
import type {
    CommonStateCity,
    CommonStateRules
} from '../../../../common/src/state';
import {
    calculateBuildingTierSum,
    calculatePeasantChangeInfo,
    calculateResourceChangeInfo,
    convertChangeInfoToChangeRate
} from '../../../../common/src/state';
import {ChangeInfoComponent} from '../change-info';
import type {ClientState} from '../../state/state';
import {numberToQuantityString} from '../../../../common/src/util';

const citizenVisuals = {
    peasant: {
        name: 'Peasants',
        image: peasantImage,
    }
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
        return null;
    }
    const citizenComponents = Object.keys(city.citizens).map(citizenType => {
        const citizensQuantity = city.citizens[citizenType];
        const citizenVisual = citizenVisuals[citizenType];
        const buildingTiersSum = calculateBuildingTierSum({buildings: city.buildings});
        const foodChangeRate = convertChangeInfoToChangeRate({
            changeInfo: calculateResourceChangeInfo({
                city,
                resourceType: 'food',
                rules,
            })
        });

        const changeInfo = calculatePeasantChangeInfo({
            buildingTiersSum,
            citizensQuantity,
            food: city.resources.food,
            foodChangeRate,
            rules,
        });
        return (
            <div
                key={citizenType}
                className="parchment-bg relative group flex flex-col w-8 sm:w-12 md:w-16 lg:w-20 xl:w-24 m-1 rounded-t-lg rounded-b-lg rounded-sm shadow-2xs bg-gray-400 hover:bg-gray-300">
                <p className="text-sm text-center font-medium text-gray-100">{numberToQuantityString({value: citizensQuantity})}</p>
                <div
                    className="absolute top-full left-full invisible group-hover:visible w-16 sm:w-24 md:w-32 lg:w-40 xl:w-48 z-10 opacity-75 cursor-default pointer-events-none">
                    <ChangeInfoComponent changeInfo={changeInfo}/>
                </div>
                <ImageComponent image={citizenVisual.image} ratio="250%"/>
                <p className="text-xs text-center text-gray-100">{citizenVisual.name}</p>
            </div>
        );
    });
    return (
        <CityItemsListComponent>{citizenComponents}</CityItemsListComponent>
    );
};

const mapStateToProps = (state: ClientState): StateProps => {
    return {
        rules: state.serverState == null ? null : state.serverState.rules,
    };
};

const actionCreators: DispatchProps = Object.freeze({});

export const CitizensComponent = connect<Props,
    OwnProps,
    StateProps,
    DispatchProps,
    ClientState,
    Dispatch<ClientAction>>(
    mapStateToProps,
    // $FlowFixMe
    actionCreators
)(Component);
