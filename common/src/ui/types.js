// @flow


import {
    COMPONENT_APP,
} from './app';
import {
    COMPONENT_ATTACK_VIEW,
} from './attack-view';
import {
    COMPONENT_CHANGE_INFO,
} from './change-info';
import {
    COMPONENT_CITY_VIEW,
} from './city-view';
import {
    COMPONENT_COST_INFO,
} from './const-info';
import {
    COMPONENT_ERRORS,
} from './errors';
import {
    COMPONENT_GAME_START,
} from './game-start';
import {
    COMPONENT_IMAGE,
} from './image';
import {
    COMPONENT_LOADER,
} from './loader';
import {
    COMPONENT_MENU,
} from './menu';
import {
    COMPONENT_WORLD_MAP,
} from './world-map';

export type ComponentKey =
    | typeof COMPONENT_APP
    | typeof COMPONENT_ATTACK_VIEW
    | typeof COMPONENT_CHANGE_INFO
    | typeof COMPONENT_CITY_VIEW
    | typeof COMPONENT_COST_INFO
    | typeof COMPONENT_ERRORS
    | typeof COMPONENT_GAME_START
    | typeof COMPONENT_IMAGE
    | typeof COMPONENT_LOADER
    | typeof COMPONENT_MENU
    | typeof COMPONENT_WORLD_MAP;
