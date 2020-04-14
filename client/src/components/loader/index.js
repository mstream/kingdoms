// @flow

import {
    connectProps,
} from './props';
import {
    Component,
} from './component';

export {
    testId as loaderComponentTestId,
} from './component';
export const LoaderComponent = connectProps(
    Component,
);
