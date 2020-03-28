// @flow


import type { ActionCreatorsProps, StateToProps } from '../types';
import { connect } from 'react-redux';
import type { Dispatch } from 'redux';
import type { Vector } from '../../../../common/src/vector';
import type { ClientAction, ClientState } from '../../state/types';
import { clientStateCameraSelectors } from '../../state/modules/_children/camera/selectors';
import { clientStateTilesSelectors } from '../../state/modules/_children/tiles/selectors';
import { clientStateCommonStateSelectors } from '../../state/modules/_children/common-state/selectors';
import { clientActions } from '../../state/modules/actions';

type OwnProps = {
    windowSize: Vector,
};

type StateProps = $ReadOnly<{
    ...StateToProps<typeof mapStateToProps>,
}>

type DispatchProps = $ReadOnly<{
    ...ActionCreatorsProps<typeof actionCreators>,
}>;

export type Props = {
    ...OwnProps,
    ...StateProps,
    ...DispatchProps,
};

const mapStateToProps = (state: ClientState) => {
    return Object.freeze({
        cameraGeometry: clientStateCameraSelectors.geometry(state),
        cities: clientStateCommonStateSelectors.cities(state),
        isVisible: clientStateCommonStateSelectors.isLoaded(state),
        tiles: clientStateTilesSelectors.tiles(state),
    });
};

const actionCreators: DispatchProps = Object.freeze({
    moveCameraUp: clientActions.camera.moveCameraUp,
    moveCameraDown: clientActions.camera.moveCameraDown,
    moveCameraLeft: clientActions.camera.moveCameraLeft,
    moveCameraRight: clientActions.camera.moveCameraRight,
    zoomCameraIn: clientActions.camera.zoomCameraIn,
    zoomCameraOut: clientActions.camera.zoomCameraOut,
});

export const connectProps = connect<Props,
    OwnProps,
    StateProps,
    DispatchProps,
    ClientState,
    Dispatch<ClientAction>>(
    mapStateToProps,
    actionCreators,
);
