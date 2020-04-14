// @flow

import {
    connectProps,
} from './props';
import {
    Component,
} from './component';

export {
    testId as imageComponentTestId,
} from './component';
export const ImageComponent = connectProps(
    Component,
);
