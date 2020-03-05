// @flow

import React, {useEffect, useRef, useState} from 'react';
import type {ClientAction} from '../../state/actions';
import {openCityView, requestCityNameChange,} from '../../state/actions';
import {connect} from 'react-redux';
import type {Dispatch} from 'redux';
import {getRefValue} from '../../util';
import type {ClientState} from '../../state/state';
import classNames from 'classnames';
import {
    currentlyViewedCityIdSelector,
    currentlyViewedCitySelector,
    nextCityIdSelector,
    previousCityIdSelector
} from '../../state/selectors';
import type {CommonStateCity} from '../../../../common/src/state';

const navigateToNextCityButton = ({nextCityId, openCityView}: {nextCityId: string, openCityView: typeof openCityView}) => {
    const onNavigateToNextCityClick = () => {
        openCityView({cityId: nextCityId});
    };

    return (
        <button
            className="metal-bg text-gray-100 font-bold py-2 px-4 rounded-tl inline-flex items-center focus:outline-none bg-gray-400 hover:bg-gray-300"
            onClick={onNavigateToNextCityClick}
        >
            <i className="icofont icofont-arrow-right"/>
        </button>
    );
};

const navigateToPreviousCityButton = ({openCityView, previousCityId}: {previousCityId: string, openCityView: typeof openCityView}) => {
    const onNavigateToPreviousCityClick = () => {
        openCityView({cityId: previousCityId});
    };

    return (
        <button
            className="metal-bg text-gray-100 font-bold py-2 px-4 rounded-tl inline-flex items-center focus:outline-none bg-gray-400 hover:bg-gray-300"
            onClick={onNavigateToPreviousCityClick}
        >
            <i className="icofont icofont-arrow-left"/>
        </button>
    );
};

type OwnProps = {};

type StateProps = {
    city: ?CommonStateCity,
    cityId: ?string,
    nextCityId: ?string,
    previousCityId: ?string,
};

type DispatchProps = {
    openCityView: typeof openCityView,
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
                       nextCityId,
                       openCityView,
                       previousCityId,
                       requestCityNameChange,
                   }: Props) => {
    if (city == null || cityId == null) {
        return null;
    }

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

    const isNavigationEnabled = previousCityId != null || nextCityId != null;

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
            {
                previousCityId != null && navigateToPreviousCityButton({openCityView, previousCityId})
            }
            <div className="flex flex-row items-center justify-center">
                {cityNameInput}
            </div>
            {
                nextCityId != null && navigateToNextCityButton({nextCityId, openCityView})
            }
        </div>
    );
};

const mapStateToProps = (state: ClientState): StateProps => {
    return Object.freeze({
        city: currentlyViewedCitySelector(state),
        cityId: currentlyViewedCityIdSelector(state),
        nextCityId: nextCityIdSelector(state),
        previousCityId: previousCityIdSelector(state),
    });
};

const actionCreators: DispatchProps = Object.freeze({
    openCityView,
    requestCityNameChange,
});

export const CityHeaderComponent = connect<Props, OwnProps, StateProps, DispatchProps, ClientState, Dispatch<ClientAction>>(
    mapStateToProps,
    // $FlowFixMe
    actionCreators,
)(Component);
