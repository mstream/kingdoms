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
    | 'nextCityButton'
    | 'ordersPanel'
    | 'ordersTab'
    | 'overviewPanel'
    | 'overviewTab'
    | 'parent'
    | 'previousCityButton'
    | 'resourcesPanel'
    | 'resourcesTab'
    | 'scheduledAttackInfo'
    | 'scheduledAttackItem'
    | 'unitsPanel'
    | 'unitsTab'
    | 'viewTabs';

export type TestIds = ElementIds< Keys >;
