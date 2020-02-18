/**
 * @flow
 */

import React from 'react';
import {EMPTY_OBJECT} from '../../../../common/src/util';
import type {Dispatch} from 'redux';
import {connect} from 'react-redux';
import lumberMillImage from '../../assets/images/buildings/lumber-mill.png';
import pastureImage from '../../assets/images/buildings/pasture.png';
import type {ClientState} from '../../state/reducers/root';
import type {ClientStateBuildings} from '../../state/reducers/cities';
import type {ClientAction} from '../../state/actions';
import {CityItemsListComponent} from '../city-items-list';
import romanDecimalConverter from 'roman-decimal';
import {ImageComponent} from '../image';
import classNames from 'classnames';

const buildingVisuals = {
    lumberMill: {
        name: 'Lumber Mill',
        image: lumberMillImage
    },
    pasture: {
        name: 'Pasture',
        image: pastureImage
    },
};

type OwnProps = {
    buildings: ClientStateBuildings,
};

type StateProps = {};

type DispatchProps = {};

type Props = {
    ...OwnProps,
    ...StateProps,
    ...DispatchProps,
};

const Component = ({buildings}: Props) => {
    const buildingComponents = Object.keys(buildings).map(buildingType => {
        const building = buildings[buildingType];
        const buildingVisual = buildingVisuals[buildingType];
        const isDisabled = building.tier === 0;
        const className = classNames(
            'flex flex-col w-8 sm:w-12 md:w-16 lg:w-20 xl:w-24 m-1 rounded-sm bg-gray-100 shadow-2xs',
            {
                'opacity-25': isDisabled,
                'opacity-100': !isDisabled
            }
        );
        return (
            <div
                key={buildingType}
                className={className}>
                <p className="text-xs text-center font-medium text-gray-900">{romanDecimalConverter.roman(building.tier)}</p>
                <ImageComponent image={buildingVisual.image} ratio="100%"/>
                <p className="text-xs text-center text-gray-900">{buildingVisual.name}</p>
            </div>
        );
    });
    return (
        <CityItemsListComponent>{buildingComponents}</CityItemsListComponent>
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

export const BuildingsComponent = connect<Props,
    OwnProps,
    StateProps,
    DispatchProps,
    ClientState,
    Dispatch<ClientAction>>(
    mapStateToProps,
    mapDispatchToProps
)(Component);
