// @flow

import type {Node} from 'react';
import React from 'react';
import type {Dispatch} from 'redux';
import type {ClientAction} from '../../state/actions';
import {connect} from 'react-redux';
import type {ClientState} from '../../state/state';

type OwnProps = {
    children?: Node,
    image: string,
    ratio: string
};

type StateProps = {};

type DispatchProps = {};

type Props = {
    ...OwnProps,
    ...StateProps,
    ...DispatchProps,
};

const Component = ({children, image, ratio}: Props) => {

    const style = {
        paddingBottom: ratio
    };
    return (
        <div
            className="relative"
            style={style}
        >
            <img
                className="absolute h-full w-full object-cover"
                src={image}
                alt="image"
            />
            {children}
        </div>
    );
};

const mapStateToProps = (state: ClientState): StateProps => {
    return Object.freeze({});
    ;
};

const actionCreators: DispatchProps = Object.freeze({});
;

export const ImageComponent = connect<Props,
    OwnProps,
    StateProps,
    DispatchProps,
    ClientState,
    Dispatch<ClientAction>>(
    mapStateToProps,
    // $FlowFixMe
    actionCreators
)(Component);
