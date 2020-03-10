// @flow

import { Component } from './component';
import { connectProps } from './props';

export { testId as appComponentTestId } from './component';
export const AppComponent = connectProps(Component);
