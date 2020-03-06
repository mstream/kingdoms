// @flow

import React from 'react';
import type {ClientAction,} from '../../state/actions';
import {closeCityView,} from '../../state/actions';
import {connect} from 'react-redux';
import {ResourcesComponent} from '../resources';
import {BuildingsComponent} from '../buildings';
import {CitizensComponent} from '../citizens';
import type {Dispatch} from 'redux';
import type {ClientState} from '../../state/state';
import type {CommonStateCity} from '../../../../common/src/state';
import {CityHeaderComponent} from '../city-header';
import {
    currentlyViewedCityIdSelector,
    currentlyViewedCitySelector,
} from '../../state/selectors/clientState';

type OwnProps = {};

type StateProps = {
    city: ?CommonStateCity,
    cityId: ?string,
};

type DispatchProps = {
    closeCityView: typeof closeCityView,
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
                   }: Props) => {
    if (cityId == null || city == null) {
        return null;
    }

    const onBackgroundClick = () => {
        closeCityView();
    };

    return (
        <div
            className="modal top-0 left-0 w-full h-full flex items-center justify-center rounded-t">
            <div
                onClick={onBackgroundClick}
                className="modal-overlay absolute w-full h-full bg-black opacity-75 top-0 left-0 cursor-pointer"
            />
            <div
                className="bricks-bg absolute w-9/12 rounded-sm shadow-lg flex flex-col items-center justify-center text-2xl bg-gray-800">
                <CityHeaderComponent/>
                <CitizensComponent city={city}/>
                <ResourcesComponent city={city}/>
                <BuildingsComponent city={city} cityId={cityId}/>
            </div>
        </div>
    );
};

const mapStateToProps = (state: ClientState): StateProps => {
    return Object.freeze({
        city: currentlyViewedCitySelector(state),
        cityId: currentlyViewedCityIdSelector(state),
    });
};

const actionCreators: DispatchProps = Object.freeze({
    closeCityView,
});

export const CityViewComponent = connect<Props, OwnProps, StateProps, DispatchProps, ClientState, Dispatch<ClientAction>>(
    mapStateToProps,
    // $FlowFixMe
    actionCreators,
)(Component);
