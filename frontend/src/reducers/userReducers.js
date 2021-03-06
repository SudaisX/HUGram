import {
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    UNLOAD_USER,
} from '../constants/userConstants';

export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { loading: true };

        case USER_LOGIN_SUCCESS:
            return { loading: false, token: action.payload };

        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload };

        case USER_LOGOUT:
            return {};

        default:
            return state;
    }
};

export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return { loading: true };

        case USER_REGISTER_SUCCESS:
            return { loading: false, token: action.payload };

        case USER_REGISTER_FAIL:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
};

export const loadUserReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_USER_REQUEST:
            return { loading: true };

        case LOAD_USER_SUCCESS:
            return { loading: false, userInfo: action.payload };

        case LOAD_USER_FAIL:
            return { loading: false, error: action.payload };

        case UNLOAD_USER:
            return {};

        default:
            return state;
    }
};
