/**
 * @flow
 */

import React from 'react';
import {EMPTY_OBJECT} from '../../../../common/src/util';
import type {Dispatch} from 'redux';
import {connect} from 'react-redux';
import peasantImage from '../../assets/images/units/peasant.png';
import type {ClientState} from '../../state/reducers/root';
import type {ClientAction} from '../../state/actions';
import {CityItemsListComponent} from '../city-items-list';
import {numberToQuantityString} from '../../util';
import {ImageComponent} from '../image';
import type {CommonStateCitizens} from '../../../../common/src/state';
import {ChangeInfoComponent} from '../change-info';

const citizenVisuals = {
    peasant: {
        name: 'Peasants',
        image: peasantImage,
    }
};

type OwnProps = {
    citizens: CommonStateCitizens,
};

type StateProps = {};

type DispatchProps = {};

type Props = {
    ...OwnProps,
    ...StateProps,
    ...DispatchProps,
};

const Component = ({citizens}: Props) => {
    const citizenComponents = Object.keys(citizens).map(citizenType => {
        const citizen = citizens[citizenType];
        const citizenVisual = citizenVisuals[citizenType];
        return (
            <div
                key={citizenType}
                className="relative group opacity-90 hover:opacity-100 flex flex-col w-8 sm:w-12 md:w-16 lg:w-20 xl:w-24 m-1 rounded-t-lg rounded-b-lg rounded-sm bg-gray-100 shadow-2xs bg-gray-800">
                <p className="text-sm text-center font-medium text-gray-100">{numberToQuantityString({value: citizen.quantity})}</p>
                <div
                    className="absolute top-full left-full invisible group-hover:visible w-16 sm:w-24 md:w-32 lg:w-40 xl:w-48 z-50 opacity-75 cursor-default pointer-events-none">
                    <ChangeInfoComponent changeInfo={citizen.changeInfo}/>
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
    return EMPTY_OBJECT;
};

const actionCreators: DispatchProps = EMPTY_OBJECT;

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
