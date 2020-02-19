/**
 * @flow
 */

import type {Node} from 'react';
import React from 'react';
import type {ClientState} from '../../state/reducers/root';
import {EMPTY_OBJECT} from '../../../../common/src/util';
import type {Dispatch} from 'redux';
import type {ClientAction} from '../../state/actions';
import {connect} from 'react-redux';


type OwnProps = { children: Node, image: string, ratio: string };

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
    return EMPTY_OBJECT;
};

const mapDispatchToProps = (
    dispatch: Dispatch<ClientAction>
): DispatchProps => {
    return EMPTY_OBJECT;
};

export const ImageComponent = connect<Props,
    OwnProps,
    StateProps,
    DispatchProps,
    ClientState,
    Dispatch<ClientAction>>(
    mapStateToProps,
    mapDispatchToProps
)(Component);
