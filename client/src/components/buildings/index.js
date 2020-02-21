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
import type {
    ClientAction,
    ClientRequestBuildingUpgradeActionCreator
} from '../../state/actions';
import {requestBuildingUpgrade} from '../../state/actions';
import {CityItemsListComponent} from '../city-items-list';
import romanDecimalConverter from 'roman-decimal';
import {ImageComponent} from '../image';
import classNames from 'classnames';
import type {
    CommonStateBuildings,
    CommonStateResources
} from '../../../../common/src/state';
import {UpgradeCostInfoComponent} from '../upgrade-cost-info';

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
    cityId: string,
    resources: CommonStateResources,
};

type StateProps = {};

type DispatchProps = {
    requestBuildingUpgrade: ClientRequestBuildingUpgradeActionCreator
};

type Props = {
    ...OwnProps,
    ...StateProps,
    ...DispatchProps,
};

const Component = ({buildings, cityId, requestBuildingUpgrade, resources}: Props) => {
    const buildingComponents = Object.keys(buildings).map(buildingType => {
        const building = buildings[buildingType];
        const buildingVisual = buildingVisuals[buildingType];
        const isDisabled = building.tier === 0;
        // check requirements for the upgrade
        const canBeUpgraded = true;
        const bodyClassName = classNames(
            {
                'filter-grayscale': isDisabled,
                'opacity-25': isDisabled,
                'opacity-100': !isDisabled
            }
        );
        const buttonClassName = classNames(
            'relative group bg-green-500 text-sm text-gray-100 rounded-t-lg',
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
                className="relative group opacity-90 hover:opacity-100 flex flex-col w-8 sm:w-12 md:w-16 lg:w-20 xl:w-24 m-1 rounded-sm rounded-t-lg rounded-b-lg shadow-2xs bg-gray-800">
                <button className={buttonClassName}
                        onClick={() => requestBuildingUpgrade({
                            cityId,
                            buildingType
                        })}>{building.tier === 0 ? 'build' : 'upgrade'}</button>
                <div className={bodyClassName}>
                    <ImageComponent image={buildingVisual.image} ratio="100%">
                        <div
                            className="absolute top-1/2 w-full bg-gray-100-alpha-50">
                            <p className="text-xl object-center text-center font-medium text-gray-900 cursor-default">{romanDecimalConverter.roman(building.tier)}</p>
                        </div>
                    </ImageComponent>
                    <p className="text-xs text-center text-gray-100 cursor-default">{buildingVisual.name}</p>
                </div>
                <div
                    className="absolute top-full left-full invisible group-hover:visible w-16 sm:w-24 md:w-32 lg:w-40 xl:w-48 z-50 opacity-75 cursor-default pointer-events-none">
                    <UpgradeCostInfoComponent
                        resources={resources}
                        upgradeCostInfo={building.upgradeCostInfo}
                    />
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

const actionCreators: DispatchProps = {
    requestBuildingUpgrade
};

export const BuildingsComponent = connect<Props,
    OwnProps,
    StateProps,
    DispatchProps,
    ClientState,
    Dispatch<ClientAction>>(
    mapStateToProps,
    // $FlowFixMe
    actionCreators
)(Component);
