/**
 * @flow
 */

import React from 'react';
import plains from '../../assets/images/terrain/plains.png';
import {createGeometryStyle} from '../../util';
import type {ClientStateTile} from '../../state/reducers/tiles';
import type {ClientState} from '../../state/reducers/root';
import type {EmptyObject} from '../../../../common/src/util';
import {EMPTY_OBJECT} from '../../../../common/src/util';
import type {Dispatch} from 'redux';
import type {ClientAction} from '../../state/actions';
import {connect} from 'react-redux';
import {ImageComponent} from '../image';

type OwnProps = {
    tile: ClientStateTile
};

type StateProps = EmptyObject;

type DispatchProps = EmptyObject;

type Props = {
    ...OwnProps,
    ...StateProps,
    ...DispatchProps,
};

const Component = ({tile}: Props) => {
    const style = {
        ...createGeometryStyle({geometry: tile.geometry}),
    };

    return <div className="absolute z-0" style={style}>
        <ImageComponent image={plains} ratio="100%"/>
    </div>;
};

const mapStateToProps = (state: ClientState): StateProps => {
    return EMPTY_OBJECT;
};

const actionCreators: DispatchProps = EMPTY_OBJECT;

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

