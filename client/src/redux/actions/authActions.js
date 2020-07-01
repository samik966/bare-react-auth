import axios from "axios";
import { AsyncStorage } from "react-native";
import Constants from "expo-constants";
//import * as Facebook from "expo-facebook";
import * as actionTypes from "./actionTypes";

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (id, token, role, msg) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        id: id,
        token: token,
        role: role,
        msg: msg,
        visible: true
    };
};

export const authFail = msg => {
    return {
        type: actionTypes.AUTH_FAIL,
        msg: msg,
        visible: true
    };
};
export const saveToken = token => {
    return {
        type: actionTypes.SAVE_TOKEN,
        token: token
    };
};
export const getToken = token => {
    return {
        type: actionTypes.GET_TOKEN,
        token: token
    };
};
export const removeToken = msg => {
    return {
        type: actionTypes.REMOVE_TOKEN,
        token: null,
        msg: msg,
        visible: true
    };
};

export const errorToken = msg => {
    return {
        type: actionTypes.ERROR_TOKEN,
        msg: msg,
        token: null,
        visible: true
    };
};

export const toggleVisible = () => {
    return {
        type: actionTypes.TOGGLE_VISIBLE,
        visible: false
    };
};

export const toggleTheme = isDark => {
    return {
        type: actionTypes.TOGGLE_THEME,
        isDarkTheme: !isDark
    };
};
/**
 * TOKEN ACTION CREATORS
 **/

export const getUserToken = () => {
    return dispatch => {
        AsyncStorage.getItem("userToken")
            .then(data => dispatch(getToken(data)))
            .catch(err => dispatch(errorToken(err.Message)));
    };
};
export const setUserToken = token => {
    return dispatch => {
        AsyncStorage.setItem("userToken", token)
            .then(data => dispatch(saveToken(token)))
            .catch(err => dispatch(errorToken(err.Message)));
    };
};
export const removeUserToken = msg => {
    return dispatch => {
        AsyncStorage.removeItem("userToken")
            .then(data => dispatch(removeToken(msg)))
            .catch(err => dispatch(errorToken(err.Message)));
    };
};

/*
 *
 * AUTH ACTION CREATORS
 *
 */

export const signup = (name, email, phone, password, navigation) => {
    return dispatch => {
        axios
            .post("http://localhost:8000/api", {
                query: `mutation createUser($name : String!, $email : String!, $phone : String!, $password : String!) { createUser(userInput : { name : $name, email : $email, phone : $phone, password : $password}) { _id } }`,
                variables: {
                    name: name,
                    email: email,
                    phone: phone,
                    password: password
                }
            })
            .then(res => {
                console.log(res.data);
                if (!res.data.data.createUser) {
                    dispatch(authFail(res.data.errors[0]));
                } else {
                    dispatch(
                        authSuccess(
                            res.data._id,
                            null,
                            "User Created. Please Login!"
                        )
                    );
                    navigation.navigate("Login");
                }
            })
            .catch(err => {
                console.log(err);
                dispatch(authFail(err));
            });
    };
};

//async action creator
export const login = (email, password, navigation) => {
    return dispatch => {
        dispatch(authStart());
        axios
            .post("http://localhost:8000/api", {
                query: `query login($email : String!, $password: String!, $device : String) { login(email : $email, password : $password, device : $device) { id token role device loginTime } }`,
                variables: {
                    email: email,
                    password: password,
                    device: Constants.deviceName
                }
            })
            .then(res => {
                if (!res.data.data.login) {
                    dispatch(authFail(res.data.errors[0]));
                } else {
                    dispatch(
                        authSuccess(
                            res.data.data.login.id,
                            res.data.data.login.token,
                            res.data.data.login.role,
                            "Logged In Successfully!"
                        )
                    );
                    dispatch(setUserToken(res.data.data.login.token));
                    navigation.navigate("Home");
                }
            })
            .catch(err => {
                console.log(err);
                dispatch(authFail(err));
            });
    };
};

export const logout = () => {
    return dispatch => {
        dispatch(removeUserToken("You have been logged Out!"));
    };
};

/**
 *
 * TOGGLE VISIBLE
 *
 * */
export const hideAlert = () => {
    return dispatch => {
        dispatch(toggleVisible());
    };
};

export const changeTheme = isDark => {
    return dispatch => {
        dispatch(toggleTheme(isDark));
    };
};

/***
 *
 * OAUTH LOGIN
 *
 ***/

export const fb_login = navigation => {
    return async dispatch => {
        try {
            dispatch(authStart());
            await Facebook.initializeAsync("298662357771181");
            const {
                type,
                token,
                expires,
                permissions,
                declinedPermissions
            } = await Facebook.logInWithReadPermissionsAsync({
                permissions: ["email", "user_friends", "public_profile"]
            });
            if (type === "success") {
                const response = await axios.get(
                    `https://graph.facebook.com/me?access_token=${token}`
                );
                console.log(token);
                dispatch(
                    authSuccess(
                        response.data.id,
                        token,
                        "Logged In Successfully!"
                    )
                );
                dispatch(setUserToken(token));
                navigation.navigate("Home");
            } else {
                dispatch(authFail("Something Went Wrong!"));
            }
        } catch ({ message }) {
            dispatch(authFail(messages));
        }
    };
};
