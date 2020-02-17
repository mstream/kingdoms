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
import type {ClientStateBuilding} from '../../state/reducers/cities';
import type {ClientAction} from '../../state/actions';
import {CityItemsListComponent} from '../city-items-list';

const buildingVisuals = {
    LUMBER_MILL: {
        name: 'Lumber Mill',
        image: lumberMillImage
    },
    PASTURE: {
        name: 'Pasture',
        image: pastureImage
    },
};

type OwnProps = {
    buildings: $ReadOnlyArray<ClientStateBuilding>,
};

type StateProps = {};

type DispatchProps = {};

type Props = {
    ...OwnProps,
    ...StateProps,
    ...DispatchProps,
};

const Component = ({buildings}: Props) => {
    const buildingComponents = buildings.map(building => {
        const buildingVisual = buildingVisuals[building.type];
        return (
            <div
                key={building.type}
                className="flex flex-col w-8 sm:w-12 md:w-16 lg:w-20 xl:w-24 m-1 rounded-sm bg-gray-100 shadow-2xs">
                <img src={buildingVisual.image} alt="building"/>
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
