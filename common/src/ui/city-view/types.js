// @flow

import type {
    ElementIds,
} from '../types';

type Keys =
    | 'background'
    | 'buildingsPanel'
    | 'buildingsTab'
    | 'header'
    | 'itemsList'
    | 'name'
    | 'ordersPanel'
    | 'ordersTab'
    | 'overviewPanel'
    | 'overviewTab'
    | 'parent'
    | 'resourcesPanel'
    | 'resourcesTab'
    | 'scheduledAttackInfo'
    | 'scheduledAttackItem'
    | 'unitsPanel'
    | 'unitsTab'
    | 'viewTabs';

export type TestIds = ElementIds< Keys >;
