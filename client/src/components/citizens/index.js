/**
 * @flow
 */

import React from 'react';
import {EMPTY_OBJECT} from '../../../../common/src/util';
import type {Dispatch} from 'redux';
import {connect} from 'react-redux';
import peasantImage from '../../assets/images/units/peasant.png';
import type {ClientState} from '../../state/reducers/root';
import type {ClientStateCitizen} from '../../state/reducers/cities';
import type {ClientAction} from '../../state/actions';
import {CityItemsListComponent} from '../city-items-list';
import {numberToQuantityString} from '../../util';

const citizenVisuals = {
    PEASANT: {
        name: 'Peasant',
        image: peasantImage
    }
};

type OwnProps = {
    citizens: $ReadOnlyArray<ClientStateCitizen>,
};

type StateProps = {};

type DispatchProps = {};

type Props = {
    ...OwnProps,
    ...StateProps,
    ...DispatchProps,
};

const Component = ({citizens}: Props) => {
    const citizenComponents = citizens.map(citizen => {
        const citizenVisual = citizenVisuals[citizen.type];
        return (
            <div
                key={citizen.type}
                className="flex flex-col w-8 sm:w-12 md:w-16 lg:w-20 xl:w-24 m-1 rounded-sm bg-gray-100 shadow-2xs">
                <p className="text-xs text-center font-medium text-gray-900">{numberToQuantityString({value: citizen.quantity})}</p>
                <img src={citizenVisual.image} alt="citizen"/>
                <p className="text-xs text-center text-gray-900">{citizenVisual.name}</p>
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

const mapDispatchToProps = (
    dispatch: Dispatch<ClientAction>
): DispatchProps => {
    return EMPTY_OBJECT;
};

export const CitizensComponent = connect<Props,
    OwnProps,
    StateProps,
    DispatchProps,
    ClientState,
    Dispatch<ClientAction>>(
    mapStateToProps,
    mapDispatchToProps
)(Component);
