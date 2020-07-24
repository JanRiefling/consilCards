import React, {useReducer} from "react";
import {SignUpUserDispatchContext, SignUpUserStateContext} from "./SignUpContext";

export const SIGN_UP = 'SIGN_UP';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILED = 'SIGN_UP_FAILED';

const initialState = {
    authStatus: undefined,
};

function signUpReducer(state, action){
    switch (action.type) {
        case SIGN_UP:
            return {...state, authStatus: 'PENDING'};
        case SIGN_UP_SUCCESS:
            return {...state, authStatus: 'SUCCESS', signUpData: action.payload};
        case SIGN_UP_FAILED:
            return {...state, authStatus: 'FAILED'};
        default:
            return state;
    }
}

function SignUpProvider({ children }) {
    const [state, dispatch] = useReducer(signUpReducer, initialState);

    return (
        <SignUpUserStateContext.Provider value={state}>
            <SignUpUserDispatchContext.Provider value={dispatch}>
                {children}
            </SignUpUserDispatchContext.Provider>
        </SignUpUserStateContext.Provider>
    );
}

export default SignUpProvider;