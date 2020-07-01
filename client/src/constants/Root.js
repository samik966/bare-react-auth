import {
  DarkTheme as NavDarkTheme,
  DefaultTheme as NavDefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import * as React from "react";
import "react-native-gesture-handler";
import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import { connect } from "react-redux";
import Navigation from "../containers/Navigation";

const LightThemes = {
  ...NavDefaultTheme,
  ...PaperDefaultTheme,
  colors: {
    ...NavDefaultTheme.colors,
    ...PaperDefaultTheme.colors,
    primary: "#ff416c",
    accent: "#ff4b2b",
    error: "#ff213b",
  },
};
const DarkThemes = {
  ...NavDarkTheme,
  ...PaperDarkTheme,
  colors: {
    ...NavDarkTheme.colors,
    ...PaperDarkTheme.colors,
    primary: "#ff416c",
    accent: "#ff4b2b",
    erorr: "#ff213b",
  },
  mode: "adaptive",
};

function Root(props) {
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);
  const theme = props.isDark ? DarkThemes : LightThemes;
  function toggleTheme() {
    setIsDarkTheme((isDark) => !isDark);
  }

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        <Navigation />
      </NavigationContainer>
    </PaperProvider>
  );
}

const mapStateToProps = (state) => {
  return {
    isDark: state.authReducer.isDarkTheme,
  };
};

export default connect(mapStateToProps)(Root);
