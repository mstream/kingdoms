/**
 * @flow
 */

import React from 'react';
import './style.css';
import { createGeometryStyle } from '../../util';
import type { Dispatch } from 'redux';
import { EMPTY_OBJECT } from '../../../../common/src/util';
import { connect } from 'react-redux';
import { openCityView } from '../../state/actions';
import type { ClientState } from '../../state/reducers/root';
import type { ClientStateCity } from '../../state/reducers/cities';
import type { ClientAction } from '../../state/actions';
import cityImage from '../../assets/images/cities/city.png';

type OwnProps = {
    city: ClientStateCity,
};

type StateProps = {};

type DispatchProps = {
    openCityView: ({ cityId: string }) => mixed,
};

type Props = {
    ...OwnProps,
    ...StateProps,
    ...DispatchProps,
};

const Component = ({ city, openCityView }: Props) => {
    const style = {
        ...createGeometryStyle({ geometry: city.geometry }),
    };

    return (
        <div
            className="City text-white font-medium"
            style={style}
            onClick={() => openCityView({ cityId: city.id })}
        >
            <img src={cityImage} className="h-full w-full" alt="city" />
            {city.name}
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
        openCityView: ({ cityId }: { cityId: string }) =>
            dispatch(openCityView({ cityId })),
    };
};

export const CityComponent = connect<
    Props,
    OwnProps,
    StateProps,
    DispatchProps,
    ClientState,
    Dispatch<ClientAction>
>(
    mapStateToProps,
    mapDispatchToProps
)(Component);
