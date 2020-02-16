/**
 * @flow
 */

import React from 'react';
import './style.css';
import { EMPTY_OBJECT } from '../../../../common/src/util';
import type { Dispatch } from 'redux';
import { connect } from 'react-redux';
import foodResourceImage from '../../assets/images/resources/food.png';
import woodResourceImage from '../../assets/images/resources/wood.png';
import type { ClientState } from '../../state/reducers/root';
import type { ClientStateResource } from '../../state/reducers/cities';
import type { ClientAction } from '../../state/actions';

const resourceImages = {
    FOOD: foodResourceImage,
    WOOD: woodResourceImage,
};

type OwnProps = {
    resources: $ReadOnlyArray<ClientStateResource>,
};

type StateProps = {};

type DispatchProps = {};

type Props = {
    ...OwnProps,
    ...StateProps,
    ...DispatchProps,
};

// <div className="flex items-center">
//     <img src={resourceImage}/>
//     <div className="text-sm">
//         <p className="text-gray-900 leading-none">{resource.quantity}</p>
//     </div>
// </div>

const ResourceComponent = ({ resource }: { resource: ClientStateResource }) => {
    const resourceImage = resourceImages[resource.type];
    return (
        <div className="inline-block mb-6 rounded-full bg-gray-300 pr-5 h-16">
            <img
                className="rounded-full float-left h-full"
                src={resourceImage}
            />
            <span className="ml-3">{resource.quantity}</span>
        </div>
    );
};

const Component = ({ resources }: Props) => {
    const components = resources.map(resource => {
        return <ResourceComponent key={resource.type} resource={resource} />;
    });
    return <div>{components}</div>;
};

const mapStateToProps = (state: ClientState): StateProps => {
    return EMPTY_OBJECT;
};

const mapDispatchToProps = (
    dispatch: Dispatch<ClientAction>
): DispatchProps => {
    return EMPTY_OBJECT;
};

export const ResourcesComponent = connect<
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
