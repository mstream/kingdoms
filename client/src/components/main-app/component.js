// @flow

import {
    ErrorsComponent,
} from '../errors';
import {
    WorldsListComponent,
} from '../worlds-list';
import {
    testIds,
} from '../../../../common/src/ui';
import React from 'react';
import classNames from 'classnames';


export const Component = () => {

    return (
        <div data-testid={testIds.mainApp.parent}>
            <div
                className={
                    classNames(
                        `grid`,
                        `grid-rows-12`,
                        `grid-flow-col`,
                        `h-screen`,
                        `w-screen`,
                        `font-gothic`,
                        `cursor-default`,
                        `select-none`,
                    )
                }
            >
                <WorldsListComponent/>
            </div>
            <ErrorsComponent/>
        </div>
    );

};
