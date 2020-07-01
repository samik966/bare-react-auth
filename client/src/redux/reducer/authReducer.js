import * as actionTypes from "../actions/actionTypes";

const initialState = {
    id: null,
    token: null,
    role: null,
    name: "",
    phone: "",
    email: "",
    msg: null,
    isDarkTheme: false,
    visible: false
};

const authStart = (state, action) => {
    return {
        ...state,
        msg: null
    };
};

const authSuccess = (state, action) => {
    return {
        ...state,
        id: action.id,
        token: action.token,
        role: action.role,
        msg: action.msg,
        visible: action.visible
    };
};

const authFail = (state, action) => {
    return {
        ...state,
        msg: action.msg,
        visible: action.visible
    };
};

const singleUserSuccess = (state, action) => {
    return {
        ...state,
        id: action.id,
        name: action.name,
        phone: action.phone,
        email: action.email
    };
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return authStart(state, action);
        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, action);
        case actionTypes.AUTH_FAIL:
            return authFail(state, action);
        case actionTypes.FETCH_USER_SUCCESS:
            return singleUserSuccess(state, action);
        case actionTypes.GET_TOKEN:
            return { ...state, token: action.token };
        case actionTypes.SAVE_TOKEN:
            return { ...state, token: action.token };
        case actionTypes.REMOVE_TOKEN:
            return {
                ...state,
                token: action.token,
                msg: action.msg,
                visible: action.visible
            };
        case actionTypes.ERROR_TOKEN:
            return {
                ...state,
                token: action.token,
                msg: action.msg,
                visible: action.visible
            };
        case actionTypes.TOGGLE_VISIBLE:
            return { ...state, msg: action.msg, visible: action.visible };
        case actionTypes.TOGGLE_THEME:
            return { ...state, isDarkTheme: action.isDarkTheme };
        default:
            return state;
    }
};

export default authReducer;
