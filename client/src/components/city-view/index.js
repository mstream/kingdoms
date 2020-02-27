/**
 * @flow
 */

import React, {useEffect, useRef, useState} from 'react';
import type {
    ClientAction,
    ClientCloseCityViewActionCreator,
    ClientNavigateToNextCityActionCreator,
    ClientNavigateToPreviousCityActionCreator,
    ClientRequestCityNameChangeActionCreator
} from '../../state/actions';
import {
    closeCityView,
    navigateToNextCity,
    navigateToPreviousCity,
    requestCityNameChange,
} from '../../state/actions';
import {connect} from 'react-redux';
import {ResourcesComponent} from '../resources';
import type {ClientState} from '../../state/reducers/root';
import type {ClientStateCity} from '../../state/reducers/cities';
import {BuildingsComponent} from '../buildings';
import {CitizensComponent} from '../citizens';
import type {Dispatch} from 'redux';
import {getRefValue} from '../../util';

type OwnProps = {
    city: ClientStateCity,
    cityId: string,
};

type StateProps = {};

type DispatchProps = {
    closeCityView: ClientCloseCityViewActionCreator,
    navigateToNextCity: ClientNavigateToNextCityActionCreator,
    navigateToPreviousCity: ClientNavigateToPreviousCityActionCreator,
    requestCityNameChange: ClientRequestCityNameChangeActionCreator,
};

type Props = {
    ...OwnProps,
    ...StateProps,
    ...DispatchProps,
};

const Component = ({
                       city,
                       cityId,
                       closeCityView,
                       navigateToNextCity,
                       navigateToPreviousCity,
                       requestCityNameChange,
                   }: Props) => {

    const nameInputRef = useRef(null);

    const [isNameBeingEdited, setNameBeingEdited] = useState(false);
    const [nameDraft, setNameDraft] = useState(null);

    useEffect(
        () => {
            if (isNameBeingEdited) {
                getRefValue({ref: nameInputRef}).focus();
            }
        },
        [
            isNameBeingEdited
        ]
    );

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
                        {isNameBeingEdited ?
                            (
                                <input
                                    ref={nameInputRef}
                                    type="text"
                                    defaultValue={nameDraft}
                                    className="text-center"
                                    onKeyDown={
                                        (event) => {
                                            switch (event.key) {
                                                case 'Enter': {
                                                    setNameBeingEdited(false);
                                                    requestCityNameChange({
                                                        cityId,
                                                        name: getRefValue({ref: nameInputRef}).value
                                                    });
                                                    break;
                                                }
                                                case 'Escape': {
                                                    setNameBeingEdited(false);
                                                    break;
                                                }
                                            }
                                        }
                                    }
                                />
                            )
                            :
                            (
                                <p
                                    className="font-bold text-2xl text-center text-gray-900"
                                    onClick={() => {
                                        setNameDraft(city.name);
                                        setNameBeingEdited(true);
                                    }}>
                                    {city.name}
                                </p>
                            )
                        }

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
                <BuildingsComponent city={city} cityId={cityId}/>
            </div>
        </div>
    );
};

const mapStateToProps = (state: ClientState): StateProps => {
    return Object.freeze({});
};

const actionCreators: DispatchProps = {
    closeCityView,
    navigateToNextCity,
    navigateToPreviousCity,
    requestCityNameChange,
};

export const CityViewComponent = connect<Props, OwnProps, StateProps, DispatchProps, ClientState, Dispatch<ClientAction>>(
    mapStateToProps,
    // $FlowFixMes
    actionCreators,
)(Component);
