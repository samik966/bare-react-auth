import React, { Component } from "react";
import {
    createStackNavigator,
    TransitionPresets
} from "@react-navigation/stack";
import { View } from "react-native";
import { Snackbar, Text } from "react-native-paper";

import Home from "./Screens/Home";

const Stack = createStackNavigator();

class Navigation extends Component {
    render() {
        return (
            <>
                <Stack.Navigator
                    animation="fade"
                    headerMode={"none"}
                    screenOptions={{
                        ...TransitionPresets.SlideFromRightIOS
                    }}
                    initialRouteName="Signup"
                >
                    <Stack.Screen name="Home" component={Home} />
                </Stack.Navigator>
            </>
        );
    }
}

export default Navigation;
