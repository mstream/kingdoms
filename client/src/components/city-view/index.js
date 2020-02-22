/**
 * @flow
 */

import React from 'react';
import type {EmptyObject} from '../../../../common/src/util';
import {EMPTY_OBJECT} from '../../../../common/src/util';
import type {
    ClientAction,
    ClientCloseCityViewActionCreator,
    ClientNavigateToNextCityActionCreator,
    ClientNavigateToPreviousCityActionCreator
} from '../../state/actions';
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
import type {Dispatch} from 'redux';

type OwnProps = {|
    city: ClientStateCity,
|};

type StateProps = EmptyObject;

type DispatchProps = {|
    closeCityView: ClientCloseCityViewActionCreator,
    navigateToNextCity: ClientNavigateToNextCityActionCreator,
    navigateToPreviousCity: ClientNavigateToPreviousCityActionCreator,
|};

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
                            navigateToPreviousCity()
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
                            navigateToNextCity()
                        }
                    >
                        <div className="w-1/12">
                            <i className="icofont icofont-arrow-right"/>
                        </div>
                    </button>
                </div>
                <CitizensComponent city={city}/>
                <ResourcesComponent city={city}/>
                <BuildingsComponent city={city}/>
            </div>
        </div>
    );
};

const mapStateToProps = (state: ClientState): StateProps => {
    return EMPTY_OBJECT;
};

const actionCreators: DispatchProps = {
    closeCityView,
    navigateToNextCity,
    navigateToPreviousCity,
};

export const CityViewComponent = connect<Props, OwnProps, StateProps, DispatchProps, ClientState, Dispatch<ClientAction>>(
    mapStateToProps,
    // $FlowFixMes
    actionCreators,
)(Component);
