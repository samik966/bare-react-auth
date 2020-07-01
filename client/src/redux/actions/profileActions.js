import * as actionTypes from "./actionTypes";
import axios from "axios";
import { AsyncStorage } from "react-native";

export const fetchUser = (id, name, phone, email) => {
    return {
        type: actionTypes.FETCH_USER_SUCCESS,
        id: id,
        name: name,
        phone: phone,
        email: email
    };
};

export const getUser = () => {
    try {
        return async dispatch => {
            const token = await AsyncStorage.getItem("userToken");
            const res = await axios.post(
                "http://localhost:8000/api",
                {
                    query: `query { singleUser { _id name phone email } }`
                },
                {
                    headers: {
                        "content-type": "application/json",
                        authorization: `Bearer ${token}`
                    }
                }
            );

            dispatch(
                fetchUser(
                    res.data.data.singleUser._id,
                    res.data.data.singleUser.name,
                    res.data.data.singleUser.phone,
                    res.data.data.singleUser.email
                )
            );
        };
    } catch (err) {
        throw err;
    }
};
