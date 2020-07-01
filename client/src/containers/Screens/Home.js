import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Button } from "react-native-paper";
import { connect } from "react-redux";
import * as actions from "../../redux/actions/index";
import SettingScreen from "./Settings/SettingScreen";
import VideoScreen from './VideoScreen';
const Tab = createMaterialBottomTabNavigator();

function Notifications() {
    return (
        <View style={styles.container}>
            <Text>Hello Notifications</Text>
        </View>
    );
}

// let FeedContainer = connect()(Feed);

export default function Home() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            shifting={true}
            sceneAnimationEnabled={false}
        >
            <Tab.Screen
                name="Home"
                component={VideoScreen}
                options={{
                    tabBarIcon: "home-account"
                }}
            />
            <Tab.Screen
                name="Notifications"
                component={Notifications}
                options={{
                    tabBarIcon: "bell-outline"
                }}
            />
            <Tab.Screen
                name="Settings"
                component={SettingScreen}
                options={{
                    tabBarIcon: "cogs"
                }}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});
