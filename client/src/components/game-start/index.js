/**
 * @flow
 */

import React, {useState} from 'react';
import type {
    ClientAction,
    ClientRequestCityCreationActionCreator
} from '../../state/actions';
import {requestCityCreation} from '../../state/actions';
import type {ClientState} from '../../state/reducers/root';
import type {Dispatch} from 'redux';
import {connect} from 'react-redux';

type OwnProps = {};

type StateProps = {};

type DispatchProps = {
    requestCityCreation: ClientRequestCityCreationActionCreator
};

type Props = {
    ...OwnProps,
    ...StateProps,
    ...DispatchProps,
};

const Component = ({requestCityCreation}: Props) => {
    const [nameDraft, setNameDraft] = useState('');

    return (
        <div
            className="modal top-0 left-0 w-full h-full flex items-center justify-center rounded-t">
            <div
                className="modal-overlay absolute w-full h-full bg-black opacity-75 top-0 left-0 cursor-pointer"
            />
            <div
                className="bricks-bg absolute w-6/12 rounded-sm shadow-lg flex flex-col items-center justify-center text-2xl bg-gray-800">
                <div
                    className="wood-bg flex flex-row items-stretch flex-none justify-between w-full bg-orange-800">
                    <div className="flex flex-row items-center justify-center">
                        <p
                            className="font-bold text-2xl text-center text-gray-100">
                            Start game
                        </p>
                    </div>
                </div>
                <form className="flex flex-col">
                    <div className="flex flex-row">
                        <div className="w-1/3">
                            <label
                                className="text-gray-500 font-bold text-right"
                                htmlFor="new-city-name">
                                City name
                            </label>
                        </div>
                        <div className="w-2/3">
                            <input
                                id="new-city-name"
                                className="appearance-none border-none w-full mx-3 leading-tight focus:outline-none text-gray-900 bg-gray-100"
                                type="text"
                                placeholder="London"
                                onChange={
                                    (event) => {
                                        setNameDraft(event.target.value);
                                    }
                                }
                            >
                            </input>
                        </div>
                    </div>
                    <button
                        className="text-lg rounded-lg focus:outline-none text-gray-100 bg-green-600 hover:bg-green-400"
                        onClick={
                            (event) => {
                                requestCityCreation({name: nameDraft});
                            }
                        }>
                        Start
                    </button>
                </form>
            </div>
        </div>
    );
};

const mapStateToProps = (state: ClientState): StateProps => {
    return Object.freeze({});
};

const actionCreators: DispatchProps = Object.freeze({
    requestCityCreation,
});

export const GameStartComponent = connect<Props, OwnProps, StateProps, DispatchProps, ClientState, Dispatch<ClientAction>, ClientAction>(
    mapStateToProps,
    // $FlowFixMes
    actionCreators,
)(Component);
