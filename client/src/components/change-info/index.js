// @flow

import {
    connectProps,
} from './props';
import {
    Component,
} from './component';

export {
    testId as changeInfoComponentTestId,
} from './component';
export const ChangeInfoComponent = connectProps(
    Component,
);
