// @flow


import type { ActionCreatorsProps, StateToProps } from '../types';
import { connect } from 'react-redux';
import type { Dispatch } from 'redux';
import type { Vector } from '../../../../common/src/vector';
import {
    moveCameraDown,
    moveCameraLeft,
    moveCameraRight,
    moveCameraUp,
    zoomCameraIn,
    zoomCameraOut,
} from '../../state/modules/camera/actions';
import type { ClientState } from '../../state/modules/types';
import type { ClientAction } from '../../state/types';
import { clientStateCameraSelectors } from '../../state/modules/camera/selectors';
import { clientStateTilesSelectors } from '../../state/modules/tiles/selectors';
import { clientStateCommonStateSelectors } from '../../state/modules/common-state/selectors';

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
    moveCameraUp,
    moveCameraDown,
    moveCameraLeft,
    moveCameraRight,
    zoomCameraIn,
    zoomCameraOut,
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
