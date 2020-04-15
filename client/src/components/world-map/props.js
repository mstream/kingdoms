// @flow

import {
    clientActions,
} from '../../state/modules/actions';
import {
    clientStateSelectors,
} from '../../state/modules/selectors';
import {
    connect,
} from 'react-redux';
import type {
    ActionCreatorsProps, StateToProps,
} from '../types';
import type {
    ClientAction, ClientState,
} from '../../state/types';
import type {
    Dispatch,
} from 'redux';
import type {
    Vector,
} from '../../../../common/src/vector';

type OwnProps = {
    windowSize: Vector,
};

type StateProps = $ReadOnly< {
    ...StateToProps< typeof mapStateToProps >,
} >;

type DispatchProps = $ReadOnly< {
    ...ActionCreatorsProps< typeof actionCreators >,
} >;

export type Props = {
    ...OwnProps,
    ...StateProps,
    ...DispatchProps,
};

const mapStateToProps = (
    state: ClientState,
) => {

    return Object.freeze(
        {
            cameraGeometry: clientStateSelectors.camera.geometry(
                state,
            ),
            cities: clientStateSelectors.commonState.cities(
                state,
            ),
            isVisible: clientStateSelectors.commonState.isLoaded(
                state,
            ),
            tiles: clientStateSelectors.tiles.tiles(
                state,
            ),
        },
    );

};

const actionCreators: DispatchProps = Object.freeze(
    {
        moveCameraDown : clientActions.camera.moveCameraDown,
        moveCameraLeft : clientActions.camera.moveCameraLeft,
        moveCameraRight: clientActions.camera.moveCameraRight,
        moveCameraUp   : clientActions.camera.moveCameraUp,
        zoomCameraIn   : clientActions.camera.zoomCameraIn,
        zoomCameraOut  : clientActions.camera.zoomCameraOut,
    },
);

export const connectProps = connect<Props,
    OwnProps,
    StateProps,
    DispatchProps,
    ClientState,
    Dispatch< ClientAction >,
    >(
        mapStateToProps,
        actionCreators,
    );
