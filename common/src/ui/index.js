// @flow


import {
    COMPONENT_APP, testIds as appTestIds,
} from './app';
import {
    COMPONENT_ATTACK_VIEW,
    testIds as attackViewTestIds,
} from './attack-view';
import {
    COMPONENT_CHANGE_INFO,
    testIds as changeInfoTestIds,
} from './change-info';
import {
    COMPONENT_CITY_VIEW, testIds as cityViewTestIds,
} from './city-view';
import {
    COMPONENT_COST_INFO, testIds as constInfoTestIds,
} from './const-info';
import {
    COMPONENT_ERRORS, testIds as errorsTestIds,
} from './errors';
import {
    COMPONENT_GAME_START,
    testIds as gameStartTestIds,
} from './game-start';
import {
    COMPONENT_IMAGE, testIds as imageTestIds,
} from './image';
import {
    COMPONENT_LOADER, testIds as loaderTestIds,
} from './loader';
import {
    COMPONENT_MENU, testIds as menuTestIds,
} from './menu';
import {
    COMPONENT_WORLD_MAP, testIds as worldMapTestIds,
} from './world-map';

export const testIds = {
    [ COMPONENT_APP ]        : appTestIds,
    [ COMPONENT_ATTACK_VIEW ]: attackViewTestIds,
    [ COMPONENT_CHANGE_INFO ]: changeInfoTestIds,
    [ COMPONENT_CITY_VIEW ]  : cityViewTestIds,
    [ COMPONENT_COST_INFO ]  : constInfoTestIds,
    [ COMPONENT_ERRORS ]     : errorsTestIds,
    [ COMPONENT_GAME_START ] : gameStartTestIds,
    [ COMPONENT_IMAGE ]      : imageTestIds,
    [ COMPONENT_LOADER ]     : loaderTestIds,
    [ COMPONENT_MENU ]       : menuTestIds,
    [ COMPONENT_WORLD_MAP ]  : worldMapTestIds,
};
