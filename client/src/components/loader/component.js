// @flow

import React from 'react';
import type { Props } from './props';


export const Component = ({ isCommonstateBeingLoaded }: Props) => {

    if (isCommonstateBeingLoaded === false) {
        return null;
    }

    return (
        <div
            className="absolute flex flex-row content-center justify-center h-screen w-screen">
            <div
                className="flex flex-col content-cente justify-center text-gray-100">
                <div
                    className="loader h-20 w-20 grid grid-cols-3">
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                </div>
                <div className="text-xl">
                    Loading...
                </div>
            </div>
        </div>
    );
};
