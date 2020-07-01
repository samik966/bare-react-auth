import * as React from "react";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import configStore from "./src/redux/store";

import Root from "./src/constants/Root";
import Loader from "./src/components/Loader";

export default function App() {
  const { store, persistor } = configStore();

  return (
    <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persistor}>
        <Root />
      </PersistGate>
    </Provider>
  );
}
