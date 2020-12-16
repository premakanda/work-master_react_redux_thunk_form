import REACT from 'react';
import { authAPI, securityAPI } from "../api/api";
import { stopSubmit } from 'redux-form';
const SET_IS_AUTH = "SET_IS_AUTH";
const SET_MESSAGE = "SET_MESSAGE";
const SET_ISLOGINED = "SET_ISLOGINED";

let stateInit = {
    isAuth: localStorage.getItem('token'),
    userId: [],
    message: '',
    isLogined:''
}

const authReducer = (state = stateInit, action) => {
    switch (action.type) {
        case SET_IS_AUTH:
            return {
                ...state,
                isAuth: action.isAuth
            }
        case SET_MESSAGE:
            return {
                ...state,
                message: action.message,
            }
        case SET_ISLOGINED:
            return {
                ...state,
                isLogined: action.value
            }
        default:
            return state
    }
}
export default authReducer;

export const setIsAuth = (isAuth) => ({ type: SET_IS_AUTH, isAuth })
export const setMessage = (message) => ({ type: SET_MESSAGE, message })
export const setCheckLogined = (value) => ({ type: SET_ISLOGINED,value })

export const loginMeThunk = (data) => async (dispatch) => {
    let response = await authAPI.loginUser(data);
    if (response.data.status === "ok") {
        localStorage.setItem('token', response.data.message.token);
        dispatch(setIsAuth(localStorage.getItem('token')))
        dispatch(setCheckLogined(''))
        dispatch(setMessage('Привет,admin'));
    } else {
        dispatch(stopSubmit('login', { _error: response.data.message.password }));
    }
}

export const logoutMeThunk = () => async (dispatch) => {
    localStorage.removeItem('token');
    dispatch(setIsAuth(false));
    dispatch(setMessage(null));
}


