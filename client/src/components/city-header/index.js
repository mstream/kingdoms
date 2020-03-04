// @flow

import React, {useEffect, useRef, useState} from 'react';
import type {ClientAction} from '../../state/actions';
import {
    navigateToNextCity,
    navigateToPreviousCity,
    requestCityNameChange,
} from '../../state/actions';
import {connect} from 'react-redux';
import type {Dispatch} from 'redux';
import {getRefValue} from '../../util';
import type {ClientState, ClientStateCityView} from '../../state/state';
import type {CommonStateCity} from '../../../../common/src/state';
import classNames from 'classnames';

type OwnProps = {
    city: CommonStateCity,
    cityId: string,
};

type StateProps = {
    cityView: ClientStateCityView,
};

type DispatchProps = {
    navigateToNextCity: typeof navigateToNextCity,
    navigateToPreviousCity: typeof navigateToPreviousCity,
    requestCityNameChange: typeof requestCityNameChange,
};

type Props = {
    ...OwnProps,
    ...StateProps,
    ...DispatchProps,
};

const Component = ({
                       city,
                       cityId,
                       cityView,
                       navigateToNextCity,
                       navigateToPreviousCity,
                       requestCityNameChange,
                   }: Props) => {

    const nameInputRef = useRef(null);

    const [isNameBeingEdited, setNameBeingEdited] = useState(false);
    const [nameDraft, setNameDraft] = useState('');

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

    const onCityNameInputChange = (event) => {
        setNameDraft(event.target.value);
    };

    const onCityNameInputClick = () => {
        setNameDraft(city.name);
        setNameBeingEdited(true);
    };

    const onCityNameInputBlur = () => {
        setNameBeingEdited(false);
    };

    const onCityNameInputKeyDown = (event) => {
        switch (event.key) {
            case 'Enter': {
                setNameBeingEdited(false);
                requestCityNameChange({
                    cityId,
                    name: nameDraft
                });
                break;
            }
            case 'Escape': {
                setNameBeingEdited(false);
                break;
            }
        }
    };

    const cityNameInput = isNameBeingEdited ?
        (
            <input
                ref={nameInputRef}
                type="text"
                defaultValue={nameDraft}
                className="text-center"
                onChange={onCityNameInputChange}
                onBlur={onCityNameInputBlur}
                onKeyDown={onCityNameInputKeyDown}
            />
        ) : (
            <p
                className="font-bold text-2xl text-center text-gray-100"
                onClick={onCityNameInputClick}>
                {city.name}
            </p>
        );

    const onNavigateToPreviousCityClick = () => {
        navigateToPreviousCity();
    };

    const onNavigateToNextCityClick = () => {
        navigateToNextCity();
    };

    const isNavigationEnabled = cityView.currentCityId !== cityView.previousCityId && cityView.currentCityId !== cityView.nextCityId;

    const navigateToPreviousCityButton = isNavigationEnabled ?
        (
            <button
                className="metal-bg text-gray-100 font-bold py-2 px-4 rounded-tl inline-flex items-center focus:outline-none bg-gray-400 hover:bg-gray-300"
                onClick={onNavigateToPreviousCityClick}
            >
                <i className="icofont icofont-arrow-left"/>
            </button>
        ) :
        null;

    const navigateToNextCityButton = isNavigationEnabled ?
        (
            <button
                className="metal-bg text-gray-100 font-bold py-2 px-4 rounded-tl inline-flex items-center focus:outline-none bg-gray-400 hover:bg-gray-300"
                onClick={onNavigateToNextCityClick}
            >
                <i className="icofont icofont-arrow-right"/>
            </button>
        ) :
        null;

    const className = classNames(
        'wood-bg flex flex-row items-stretch flex-none w-full bg-orange-800',
        {
            'justify-between': isNavigationEnabled,
            'justify-center': !isNavigationEnabled,
        },
    );

    return (
        <div
            className={className}>
            {navigateToPreviousCityButton}
            <div className="flex flex-row items-center justify-center">
                {cityNameInput}
            </div>
            {navigateToNextCityButton}
        </div>
    );
};

const mapStateToProps = (state: ClientState): StateProps => {
    return Object.freeze({
        cityView: state.menu.cityView,
    });
};

const actionCreators: DispatchProps = Object.freeze({
    navigateToNextCity,
    navigateToPreviousCity,
    requestCityNameChange,
});

export const CityHeaderComponent = connect<Props, OwnProps, StateProps, DispatchProps, ClientState, Dispatch<ClientAction>>(
    mapStateToProps,
    // $FlowFixMe
    actionCreators,
)(Component);
