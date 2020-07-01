import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
//import AsyncStorage from "@react-native-community/async-storage";
import { AsyncStorage } from "react-native";

import { persistStore, persistReducer } from "redux-persist";
import rootReducer from "../reducer";

const persistConfig = {
    key: "root",
    storage: AsyncStorage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
    let store = createStore(persistedReducer, applyMiddleware(thunk));
    let persistor = persistStore(store);
    return { store, persistor };
};
