// @flow


import {
    Selector,
} from 'testcafe';
import type {
    ElementsIndex,
} from '../../../../common/src/ui/types';

export type ElementSelectors<K: string> = ElementsIndex< K, Selector >;
