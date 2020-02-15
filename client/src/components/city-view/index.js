/**
 * @flow
 */

import React from 'react';
import './style.css';
import {EMPTY_OBJECT} from '../../../../common/src/util';
import type {Dispatch} from 'redux';
import {
    closeCityView,
    navigateToNextCity,
    navigateToPreviousCity
} from '../../actions';
import {connect} from 'react-redux';
import {ResourcesComponent} from '../resources';
import type {ClientState} from '../../state/reducers/root';
import type {ClientStateCity} from '../../state/reducers/cities';
import type {ClientAction} from '../../actions';

type OwnProps = {
    city: ClientStateCity
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
    ...DispatchProps
}

const Component = ({city, closeCityView, navigateToNextCity: navigateToNextCity, navigateToPreviousCity: navigateToPreviousCity}: Props) => {
    return (
        <div
            className="CityView modal absolute w-full h-full top-0 left-0 flex items-center justify-center">
            <div
                onClick={() => closeCityView()}
                className="modal-overlay absolute w-full h-full bg-black opacity-75 top-0 left-0 cursor-pointer"/>
            <div
                className="absolute w-1/2 h-32 bg-white rounded-sm shadow-lg flex flex-col items-center justify-center text-2xl">
                <div className="flex w-full">
                    <button
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                        onClick={() => navigateToPreviousCity({currentCityId: city.id})}>
                        <div className="w-1/12">
                            <i className="icofont icofont-arrow-left"/>
                        </div>
                    </button>

                    <div className="w-10/12 font-bold text-xl mb-2">
                        <p className="text-center">{city.name}</p>
                    </div>
                    <button
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                        onClick={() => navigateToNextCity({currentCityId: city.id})}>
                        <div className="w-1/12">
                            <i className="icofont icofont-arrow-right"/>
                        </div>
                    </button>
                </div>

                <ResourcesComponent resources={city.resources}/>
            </div>
        </div>
    );
};

const mapStateToProps = (state: ClientState): StateProps => {
    return EMPTY_OBJECT;
};

const mapDispatchToProps = (dispatch: Dispatch<ClientAction>): DispatchProps => {
    return {
        closeCityView: () => dispatch(closeCityView()),
        navigateToNextCity: ({currentCityId}: { currentCityId: string }) => dispatch(navigateToNextCity({currentCityId})),
        navigateToPreviousCity: ({currentCityId}: { currentCityId: string }) => dispatch(navigateToPreviousCity({currentCityId})),
    };
};

export const CityViewComponent = connect<Props, OwnProps, StateProps, DispatchProps, ClientState, Dispatch<ClientAction>>(mapStateToProps, mapDispatchToProps)(Component);
