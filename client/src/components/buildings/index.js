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
import type {ClientAction} from '../../state/actions';
import {CityItemsListComponent} from '../city-items-list';
import romanDecimalConverter from 'roman-decimal';
import {ImageComponent} from '../image';
import classNames from 'classnames';
import type {
    CommonStateBuildings,
    CommonStateResources
} from '../../../../common/src/state';

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
    buildings: CommonStateBuildings,
    resources: CommonStateResources,
};

type StateProps = {};

type DispatchProps = {};

type Props = {
    ...OwnProps,
    ...StateProps,
    ...DispatchProps,
};

const Component = ({buildings, resources}: Props) => {
    const buildingComponents = Object.keys(buildings).map(buildingType => {
        const building = buildings[buildingType];
        const buildingVisual = buildingVisuals[buildingType];
        const isDisabled = building.tier === 0;
        const canBeUpgraded = resources.wood.quantity > 1000;
        const bodyClassName = classNames(
            {
                'filter-grayscale': isDisabled,
                'opacity-25': isDisabled,
                'opacity-100': !isDisabled
            }
        );
        const buttonClassName = classNames(
            'relative bg-green-500 text-sm text-gray-100',
            {
                'cursor-pointer': canBeUpgraded,
                'cursor-not-allowed': !canBeUpgraded,
                'opacity-25': !canBeUpgraded,
                'opacity-100': canBeUpgraded,
                'hover:bg-green-700': canBeUpgraded,
            }
        );
        return (
            <div
                key={buildingType}
                className="flex flex-col w-8 sm:w-12 md:w-16 lg:w-20 xl:w-24 overflow-hidden m-1 rounded-sm rounded-t-lg rounded-b-lg shadow-2xs bg-gray-800">
                <button
                    className={buttonClassName}>{building.tier === 0 ? 'build' : 'upgrade'}</button>
                <div className={bodyClassName}>
                    <ImageComponent image={buildingVisual.image} ratio="100%">
                        <div
                            className="absolute top-1/2 w-full bg-gray-100-alpha-50">
                            <p className="text-xl object-center text-center font-medium text-gray-900 cursor-default">{romanDecimalConverter.roman(building.tier)}</p>
                        </div>
                    </ImageComponent>
                    <p className="text-xs text-center text-gray-100 cursor-default">{buildingVisual.name}</p>
                </div>
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
