/**
 * @flow
 */

import React from 'react';
import {EMPTY_OBJECT} from '../../../../common/src/util';
import type {Dispatch} from 'redux';
import type {ClientAction} from '../../state/actions';
import {
    closeCityView,
    navigateToNextCity,
    navigateToPreviousCity,
} from '../../state/actions';
import {connect} from 'react-redux';
import {ResourcesComponent} from '../resources';
import type {ClientState} from '../../state/reducers/root';
import type {ClientStateCity} from '../../state/reducers/cities';
import {BuildingsComponent} from '../buildings';
import {CitizensComponent} from '../citizens';

type OwnProps = {
    city: ClientStateCity,
};

type StateProps = {};

type DispatchProps = {
    closeCityView: () => mixed,
    navigateToNextCity: ({ currentCityId: string }) => mixed,
    navigateToPreviousCity: ({ currentCityId: string }) => mixed,
};

type Props = {
    ...OwnProps,
    ...StateProps,
    ...DispatchProps,
};

const Component = ({
                       city,
                       closeCityView,
                       navigateToNextCity: navigateToNextCity,
                       navigateToPreviousCity: navigateToPreviousCity,
                   }: Props) => {
    return (
        <div
            className="z-30 modal absolute top-0 left-0 w-full h-full flex items-center justify-center rounded-t">
            <div
                onClick={() => closeCityView()}
                className="modal-overlay absolute w-full h-full bg-black opacity-75 top-0 left-0 cursor-pointer"
            />
            <div
                className="absolute w-9/12 bg-white rounded-sm shadow-lg flex flex-col items-center justify-center text-2xl">
                <div
                    className="flex flex-row items-stretch flex-none justify-between w-full">
                    <button
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                        onClick={() =>
                            navigateToPreviousCity({currentCityId: city.id})
                        }
                    >
                        <div className="w-1/12">
                            <i className="icofont icofont-arrow-left"/>
                        </div>
                    </button>

                    <div className="flex flex-row items-center justify-center">
                        <p
                            className="font-bold text-2xl text-center text-gray-900">
                            {city.name}
                        </p>
                    </div>

                    <button
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                        onClick={() =>
                            navigateToNextCity({currentCityId: city.id})
                        }
                    >
                        <div className="w-1/12">
                            <i className="icofont icofont-arrow-right"/>
                        </div>
                    </button>
                </div>
                <CitizensComponent citizens={city.citizens}/>
                <ResourcesComponent resources={city.resources}/>
                <BuildingsComponent buildings={city.buildings} resources={city.resources}/>
            </div>
        </div>
    );
};

const mapStateToProps = (state: ClientState): StateProps => {
    return EMPTY_OBJECT;
};

const mapDispatchToProps = (
    dispatch: Dispatch<ClientAction>
): DispatchProps => {
    return {
        closeCityView: () => dispatch(closeCityView()),
        navigateToNextCity: ({currentCityId}: { currentCityId: string }) =>
            dispatch(navigateToNextCity({currentCityId})),
        navigateToPreviousCity: ({
                                     currentCityId,
                                 }: {
            currentCityId: string,
        }) => dispatch(navigateToPreviousCity({currentCityId})),
    };
};

export const CityViewComponent = connect<Props,
    OwnProps,
    StateProps,
    DispatchProps,
    ClientState,
    Dispatch<ClientAction>>(
    mapStateToProps,
    mapDispatchToProps
)(Component);
