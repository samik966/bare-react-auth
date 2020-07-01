import React, { Component } from "react";
import {
    createStackNavigator,
    TransitionPresets
} from "@react-navigation/stack";
import Settings from "./Settings";
import Profile from "./Profile";

const SettingStack = createStackNavigator();

export default function SettingScreen(props) {
    return (
        <SettingStack.Navigator
            animation="fade"
            headerMode={"none"}
            screenOptions={{
                ...TransitionPresets.SlideFromRightIOS
            }}
        >
            <SettingStack.Screen name="Settings" component={Settings} />
            <SettingStack.Screen name="Profile" component={Profile} />
        </SettingStack.Navigator>
    );
}
