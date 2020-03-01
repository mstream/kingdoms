// @flow

import React from 'react';
import {createGeometryStyle} from '../../util';
import type {ClientStateTile} from '../../state/reducers/tiles';
import type {ClientState} from '../../state/reducers/root';
import type {Dispatch} from 'redux';
import type {ClientAction} from '../../state/actions';
import {connect} from 'react-redux';
import {ImageComponent} from '../image';
import {surfaceImages} from '../../assets/images/terrain';

type OwnProps = {
    tile: ClientStateTile
};

type StateProps = {};

type DispatchProps = {};

type Props = {
    ...OwnProps,
    ...StateProps,
    ...DispatchProps,
};

const Component = ({tile}: Props) => {
    const style = {
        ...createGeometryStyle({geometry: tile.geometry}),
    };

    return <div className="absolute" style={style}>
        <ImageComponent image={surfaceImages[tile.textureIndex]} ratio="100%"/>
    </div>;
};

const mapStateToProps = (state: ClientState): StateProps => {
    return Object.freeze({});
};

const actionCreators: DispatchProps = Object.freeze({});
;

export const TileComponent = connect<Props,
    OwnProps,
    StateProps,
    DispatchProps,
    ClientState,
    Dispatch<ClientAction>>(
    mapStateToProps,
    // $FlowFixMe
    actionCreators
)(Component);

