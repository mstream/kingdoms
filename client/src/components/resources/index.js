/**
 * @flow
 */

import React from 'react';
import './style.css';
import {EMPTY_OBJECT} from '../../../../common/src/util';
import type {Dispatch} from 'redux';
import {connect} from 'react-redux';
import foodResourceImage from '../../assets/images/resources/food.png';
import woodResourceImage from '../../assets/images/resources/wood.png';
import type {ClientState} from '../../state/reducers/root';
import type {ClientStateResource} from '../../state/reducers/cities';
import type {ClientAction} from '../../actions';

const resourceImages = {
    'FOOD': foodResourceImage,
    'WOOD': woodResourceImage,
};

type OwnProps = {
    resources: $ReadOnlyArray<ClientStateResource>
};

type StateProps = {};

type DispatchProps = {};

type Props = {
    ...OwnProps,
    ...StateProps,
    ...DispatchProps
}

const ResourceComponent = ({resource}: { resource: ClientStateResource }) => {
    const resourceImage = resourceImages[resource.type];
    return (
        <div className="flex items-center">
            <img className="w-10 h-10 rounded-full mr-4" src={resourceImage}/>
            <div className="text-sm">
                <p className="text-gray-900 leading-none">{resource.quantity}</p>
            </div>
        </div>
    );
};

const Component = ({resources}: Props) => {
    const components = resources.map(resource => {
        return (
            <ResourceComponent key={resource.type} resource={resource}/>
        );
    });
    return (
        <div>
            {components}
        </div>
    );
};

const mapStateToProps = (state: ClientState): StateProps => {
    return EMPTY_OBJECT;
};

const mapDispatchToProps = (dispatch: Dispatch<ClientAction>): DispatchProps => {
    return EMPTY_OBJECT;
};

export const ResourcesComponent = connect<Props, OwnProps, StateProps, DispatchProps, ClientState, Dispatch<ClientAction>>(mapStateToProps, mapDispatchToProps)(Component);
