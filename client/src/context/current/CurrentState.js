import React, { useReducer } from 'react';

import CurrentContext from './currentContext';
import currentReducer from './currentReducer';
import { SET_CURRENT, CLEAR_CURRENT } from '../types';

const CurrentState = props => {
    const initialState = {
        current: null
    };
    const [state, dispatch] = useReducer(currentReducer, initialState);

    const setCurrent = current => {
        dispatch({ type: SET_CURRENT, payload: current });
    };

    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT });
    };

    return (
        <CurrentContext.Provider
            value={{
                current: state.current,
                setCurrent,
                clearCurrent
            }}
        >
            {props.children}
        </CurrentContext.Provider>
    );
};

export default CurrentState;