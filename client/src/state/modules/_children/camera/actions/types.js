// @flow

import type { BaseAction } from '../../../../../../../common/src/types/actions';
import type { Vector } from '../../../../../../../common/src/vector';

export const MOVE_CAMERA: 'MOVE_CAMERA' = 'MOVE_CAMERA';
export const ZOOM_CAMERA: 'ZOOM_CAMERA' = 'ZOOM_CAMERA';

export type ClientMoveCameraAction = BaseAction<
    typeof MOVE_CAMERA,
    $ReadOnly<{ vector: Vector }>,
>;
export type ClientZoomCameraAction = BaseAction<
    typeof ZOOM_CAMERA,
    $ReadOnly<{ vector: Vector }>,
>;
